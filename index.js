const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { postLogin, postSignup } = require("./controllers/authController");
const { postWish, getWishes } = require("./controllers/wishController");
const checkUser = require("./middlewares/checkUser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((r) => console.log("connected to atlas"))
  .catch((e) => console.log("error in connecting to atlas"));

app.post("/auth/signup", postSignup);
app.post("/auth/login", postLogin);
app.post("/api/wish", checkUser, postWish);
app.get("/api/wish", checkUser, getWishes);

app.listen(process.env.PORT, console.log("http://localhost:3000"));
