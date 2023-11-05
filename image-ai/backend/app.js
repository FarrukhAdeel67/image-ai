import express from "express";
import { config } from "dotenv";
import courseRouter from "./routes/courseRoutes.js";

import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config({
  path: "./config/config.env",
});
const app = express();

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // only this url can use these apis
    credentials: true, //true to use the cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); // if not present than we can make request from this  server to another site
//importing and using Routes
app.use("/api/v1/", courseRouter);

export default app;
app.get("/api/v1", (req, res) => {
  res.send(
    `<h1>Server is working. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit front end</h1>`
  );
});
app.use(errorMiddleware);
