import app from "./app.js";
import cloudinary from "cloudinary";
import { connectDB } from "./config/database.js";
import nodeCron from "node-cron";

connectDB();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
const port = 4000;


app.listen(port || process.env.PORT, () => {
  console.log(`Server is working on port: ${process.env.PORT}`);
});
