import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import DatabaseConnection from "./database/index.js";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
const app = express();

// CONFIGRATIONS //
dotenv.config();

// MIDDLEWARES //
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// BUNDELING ROUTES //
app.use("/api/auth", authRouter);

// SERVER STARTING //
app.listen(8000, () => {
  console.log("server started");
  DatabaseConnection();
});
