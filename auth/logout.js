const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

module.exports = Router;
