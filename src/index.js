import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.send("Token required!!");
  }

  const token = authHeader.split("")[1];

  try {
    jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};

app.use("/user", userRoutes);

app.use("/data", authMiddleware);

app.get("/data/get-data", (req, res) => {
  const data = [{ name: "1" }];
  res.send(data);
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ nuutsmedee: "benzin usnu" }, process.env.SECRET_KEY);
  res.send(token);
});

app.listen(3000, () => {
  console.log("app running on 3000");
});
