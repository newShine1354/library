import express from "express";
import userRouter from "./userRoutes.js";
import bookRouter from "./bookRoutes.js";
import checkoutRouter from "./checkoutRoutes.js";

const route = express.Router();

route.use("/user", userRouter);
route.use("/books", bookRouter);
route.use("/checkout", checkoutRouter);

export default route;
