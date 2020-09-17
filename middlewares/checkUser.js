const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken) => {
      if (err) {
        return res.status(401).json({ error: "Token tampered" });
      }
      req.body.user = await User.findById(decodedtoken.id);
      next();
    });
  } catch (e) {
    res.status(500).json({ error: "Authentication failed, server error" });
  }
};

module.exports = checkUser;
