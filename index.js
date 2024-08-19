import storeRoutes from "./routes/store.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,
      "http://localhost:5173",
      "http://192.168.0.74:5173",
    ],
  }),
);
// Main Routes
app.use("/store", storeRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the StyleHub API</h1>");
});

app.listen(8800, () => {
  console.log("API working");
});
