import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import {
  addBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/bookController.js";

const route = express.Router();

route.post("/", addBook);
route.get("/", getBooks);
route.put("/:id", updateBook);
route.delete("/:id", deleteBook);

export default route;
