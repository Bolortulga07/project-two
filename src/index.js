import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { userRoutes } from "./modules/user/routes/userRoutes.js";
import { blogRoutes } from "./modules/blog/routes/blogRoutes.js";
import { authRoutes } from "./modules/auth/routes/authRoutes.js";
import { comRoutes } from "./modules/comment/routes/comRoutes.js";

dotenv.config();

class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`sainuu bi ${this.name} bn`);

    this.sayBey();
  }

  sayBey() {
    console.log("Bayartai");
  }
}

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to MONGO");
});

const app = express();

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.send("Token!!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};
app.use("/", authRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/blogs", authMiddleware, blogRoutes);
app.use("/comment", authMiddleware, comRoutes);
app.use("/data", authMiddleware);

app.get("/login", (req, res) => {
  const token = jwt.sign({ userId: "123" }, process.env.SECRET_KEY);
  res.send(token);
});

app.listen(3000, () => {
  console.log("app running on 3000");
});
