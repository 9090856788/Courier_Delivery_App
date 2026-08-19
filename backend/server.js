import dotenv from "dotenv";
dotenv.config();

import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";

import dbConnect from "./db/dbConnection.js";
import swaggerSpec from "./config/swagger.js";

import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { authLimiter, globalAPILimiter } from "./middlewares/rateLimiter.js";

/* -------------------------------------------------------------------------- */
/*                                  Routes                                    */
/* -------------------------------------------------------------------------- */

import AuthRoutes from "./routes/authRoutes.js";
import ParcelRoutes from "./routes/parcelRoutes.js";

/* -------------------------------------------------------------------------- */
/*                              Configuration                                 */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 3000;

/* -------------------------------------------------------------------------- */
/*                                Express App                                */
/* -------------------------------------------------------------------------- */

const app = express();

/* -------------------------------------------------------------------------- */
/*                           Security Middleware                              */
/* -------------------------------------------------------------------------- */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

/* -------------------------------------------------------------------------- */
/*                             Request Middleware                             */
/* -------------------------------------------------------------------------- */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());

app.use(morgan("dev"));

/* -------------------------------------------------------------------------- */
/*                              Rate Limiting                                 */
/* -------------------------------------------------------------------------- */

/*
 * Global API rate limiter.
 *
 * This must be registered BEFORE the API routes so that
 * incoming API requests are actually rate limited.
 */
app.use("/api", globalAPILimiter);

/*
 * Authentication-specific rate limiter.
 *
 * Login/register routes can have their own stricter limiter.
 * The login route already uses authLimiter directly, so we don't
 * apply it globally here to avoid unnecessarily limiting other APIs.
 */

/* -------------------------------------------------------------------------- */
/*                            Swagger Documentation                           */
/* -------------------------------------------------------------------------- */

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    explorer: true,
  }),
);

/* -------------------------------------------------------------------------- */
/*                                Health Check                                */
/* -------------------------------------------------------------------------- */

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "ok",
    message: "Server is healthy",
  });
});

/* -------------------------------------------------------------------------- */
/*                                API Routes                                  */
/* -------------------------------------------------------------------------- */

app.use("/api/auth", AuthRoutes);

app.use("/api/parcels", ParcelRoutes);

/* -------------------------------------------------------------------------- */
/*                              404 Handler                                   */
/* -------------------------------------------------------------------------- */

app.use(notFoundHandler);

/* -------------------------------------------------------------------------- */
/*                             Error Handler                                  */
/* -------------------------------------------------------------------------- */

app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*                             Database Connection                            */
/* -------------------------------------------------------------------------- */

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);

      console.log(`Swagger documentation: http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);

    process.exit(1);
  }
};

startServer();
