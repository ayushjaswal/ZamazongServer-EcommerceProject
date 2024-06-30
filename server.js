import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";

app.use(cookieParser());

dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  cors({
    credentials: true,
    origin: process.env.HOST,
  })
);
connect();

app.use("/", authRoutes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
