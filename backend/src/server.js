import express from "express";

//connectDb
import connectDB from "./utils/connectDB.js";

//middleware
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticate from "./middlewares/authenticate.js";

//router
import client from "./routes/client.js";
import auth from "./routes/auth.js";

// utils
import { PORT } from "./utils/constaints.js";

const app = express();

//PORT
const port = PORT || 8000;

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.use("/api/client", authenticate, client);
app.use("/api/auth", auth);

//Server Listen
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Listening On PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
