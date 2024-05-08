import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { strongPassword, validEmail } from "../utils/regex.js";
import { triggerAsyncId } from "async_hooks";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(400).send({ message: "Enter name", success: false });
    }
    if (!strongPassword.test(password)) {
      res
        .status(200)
        .send({ message: "Enter strong password", success: false });
    }
    if (!validEmail.test(email)) {
      res
        .status(200)
        .send({ message: "Enter valid email address", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      res.status(400).send({ message: "Enter valid fields.", success: false });
    }
    const accessToken = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "10d",
    });

    res.status(201).send({
      message: "User created Successfully.",
      user,
      accessToken,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while handling registration",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Please register first.", success: false });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .send({ message: "Incorred Password", success: false });
    }
    const userData = await User.findOne({ email }).select("-passord");
    const accessToken = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "10d",
    });
    res
      .status(200)
      .send({ message: "Logined Successfully.", user: userData, accessToken });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while handling loggin In",
      success: false,
    });
  }
};
export { registerUser, loginUser };
