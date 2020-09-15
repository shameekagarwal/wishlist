const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: 36000,
  });
};

Router.get("/", (req, res) => res.render("signup"));

Router.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const exists = await User.findOne({ email });
    // USER ALREADY EXISTS
    if (exists) {
      return res.redirect("/login");
    }
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 36000000 });
    res.redirect("/wishlist");
  } catch (e) {
    // ERROR SIGNING UP USER
    res.redirect("/signup");
  }
});

module.exports = Router;
