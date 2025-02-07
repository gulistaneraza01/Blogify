import User from "../models/user.js";
import { secretKey } from "../utils/constaints.js";
import { comparePassword, encPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

//signup
const signup = async (req, res) => {
  const { username, email, password, profileImageUrl } = req.body;
  const hashPassword = await encPassword(password);
  const query = new User({
    username,
    email,
    password: hashPassword,
    profileImageUrl,
  });
  try {
    const newUser = await query.save();
    const userObject = newUser.toObject();
    delete userObject.password;
    const token = jwt.sign(userObject, secretKey, { expiresIn: "7d" });
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({ status: "signup", data: userObject });
  } catch (error) {
    return res.status(400).json(error);
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  const query = User.findOne({ email });
  try {
    const doc = await query.exec();
    const isMatch = await comparePassword(password, doc.password);
    if (isMatch) {
      const userObj = doc.toObject();
      delete userObj.password;
      const token = jwt.sign(userObj, secretKey, { expiresIn: "7d" });
      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ status: "success", data: { userObj } });
    } else {
      return res
        .status(400)
        .json({ status: "failure", message: "wrong password" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failure", message: "user does not exist" });
  }
};

//logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ status: "logout" });
};

export { signup, login, logout };
