import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { authentication } from "../middleware/authMiddleware.js";
const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);

export default route;
