import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config(); 
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Server runing at port http://localhost:${process.env.PORT}`)
);
