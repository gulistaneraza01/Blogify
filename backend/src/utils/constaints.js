import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const mongoURL = process.env.MONGODB_URL;
const secretKey = process.env.SECRET_KEY;

export { PORT, mongoURL, secretKey };
