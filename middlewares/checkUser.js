const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = (req, res, next) => {
  const token = req.body.jwt;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken) => {
      if (!err) {
        req.body.user = await User.findById(decodedtoken.id);
        next();
      }
    });
  } else {
    res.json({ error: "authentication failed" });
  }
};

module.exports = checkUser;
