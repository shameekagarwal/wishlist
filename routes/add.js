const express = require("express");
const Router = express.Router();
const checkUser = require("../auth/checkauth");

Router.get("/", checkUser, (req, res) => {
  res.render("add");
});

Router.post("/", checkUser, async (req, res) => {
  try {
    const { title, description, user } = req.body;
    user.wishlist.push({ title, description });
    await user.save();
    res.redirect("/");
  } catch (e) {
    // ERROR CREATING USER WISHLIST
    res.redirect("/");
  }
});

module.exports = Router;
