const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const signup = require("./auth/signup");
const login = require("./auth/login");
const wishlist = require("./routes/wishlist");
const add = require("./routes/add");
const checkUser = require("./auth/checkauth");
const logout = require("./auth/logout");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((r) => console.log("connected to atlas"))
  .catch((e) => console.log("error in connecting to atlas"));

app.use("/signup", signup);
app.use("/login", login);
app.use("/wishlist", wishlist);
app.use("/add", add);
app.use("/logout", logout);

app.get("*", checkUser, (req, res) => {
  res.redirect("/wishlist");
});

app.listen(process.env.PORT, console.log("http://localhost:3000"));
