import dotenv from "dotenv";
dotenv.config();
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressRateLimiter from "express-rate-limiter";
import helmet from "helmet";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}):`);
});
