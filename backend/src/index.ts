import express from "express";
import connectDB from "./config/database";
const cloudinary = require("cloudinary").v2;
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import user from "./routes/userroutes";
import product from "./routes/prodroutes";
import cors from "cors";
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "*");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

connectDB();

app.use("/api/v1", user);
app.use("/api/v1", product);

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
