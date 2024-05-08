import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import {
  createCheckout,
  returnBook,
} from "../controllers/checkoutController.js";

const route = express.Router();

route.post("/", createCheckout);
route.put("/:id", returnBook);

export default route;
