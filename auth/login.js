const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: 36000,
  });
};

Router.get("/", (req, res) => res.render("login"));

Router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    // USER DOESNT EXIST
    if (!user) {
      return res.redirect("/login");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 36000000 });
    res.redirect("/wishlist");
  } catch (e) {
    // ERROR LOGGING IN USER
    res.redirect("/login");
  }
});

module.exports = Router;
