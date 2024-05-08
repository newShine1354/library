import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const authentication = async (req, res, next) => {
  try {
    const Authorization = req.headers["authorization"];
    if (!Authorization) {
      return res
        .status(401)
        .send({ message: "Please login first", success: false });
    }

    const verifiedToken = jwt.verify(Authorization, "secretKey");
    const user = await User.findOne({
      _id: new ObjectId(verifiedToken.userId),
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

export { authentication };
