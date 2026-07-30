import dotenv from "dotenv";
dotenv.config();
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dbConnect from "./db/dbConnection.js";
import swaggerSpec from "./config/swagger.js";
import swaggerUI from "swagger-ui-express";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { authLimiter, globalAPILimiter } from "./middlewares/rateLimiter.js";

// Router Files
import AuthRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// swagger documentation route
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// API Routes
app.use("/api/auth", AuthRoutes);

// rateLimiter
app.use(globalAPILimiter);
app.use(authLimiter);

// error handling middlewares
app.use(notFoundHandler);
app.use(errorHandler);

//db connection
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}):`);
});
