import dotenv from "dotenv";
dotenv.config();

import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import dbConnect from "./backend/db/dbConnection.js";
import { errorHandler } from "./backend/middlewares/errorHandler.js";
import { globalAPILimiter } from "./backend/middlewares/rateLimiter.js";

import AuthRoutes from "./backend/routes/authRoutes.js";
import ParcelRoutes from "./backend/routes/parcelRoutes.js";
import DashboardRoutes from "./backend/routes/dashboardRoutes.js";
import AnalyticsRoutes from "./backend/routes/analyticsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT, 10) || 3000;
const app = express();

// Trust reverse proxy headers (e.g. Cloud Run, AI Studio preview environment)
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "ok",
    message: "Server is healthy",
  });
});

// Rate limiting for API
app.use("/api", globalAPILimiter);

// API Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/parcels", ParcelRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/analytics", AnalyticsRoutes);

// Database connection & Vite dev server / static serving
const startServer = async () => {
  try {
    await dbConnect();
  } catch (err) {
    console.warn("DB init warning:", err.message);
  }

  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true, host: "0.0.0.0" },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware mounted for development");
    } catch (err) {
      console.error("Failed to mount Vite middleware, falling back to static:", err);
      app.use(express.static(path.join(__dirname, "dist")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
      });
    }
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  // Error Handler
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CargoPilot server running on http://0.0.0.0:${PORT}`);
  });
};

startServer();
