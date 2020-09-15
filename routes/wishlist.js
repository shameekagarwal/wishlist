const express = require("express");
const Router = express.Router();
const checkUser = require("../auth/checkauth");

Router.get("/", checkUser, (req, res) => {
  try {
    const { user } = req.body;
    const { wishlist } = user;
    res.render("wishlist", { wishes: wishlist });
  } catch (e) {
    // ERROR RENDERING WISHLIST
    res.redirect("/");
  }
});

module.exports = Router;
