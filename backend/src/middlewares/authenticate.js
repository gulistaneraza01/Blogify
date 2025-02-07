import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { secretKey } from "../utils/constaints.js";

const authenticate = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const userInfo = jwt.verify(token, secretKey);
    const user = await User.findById({ _id: userInfo._id });
    if (user) {
      req.userId = user._id;
      return next();
    }
  } catch (error) {
    res.status(401).json({ status: "required authetication", data: error });
  }
};

export default authenticate;
