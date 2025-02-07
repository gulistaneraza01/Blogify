import mongoose from "mongoose";
import { mongoURL } from "./constaints.js";

async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log(`Connected To MONGODB`);
  } catch (error) {
    console.log(`Error Connection To MONGODB ${error}`);
  }
}

export default connectDB;
