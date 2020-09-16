const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.json({ error: "token missing" });
    }
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken) => {
      if (err) {
        return res.json({ error: "token tampered" });
      }
      req.body.user = await User.findById(decodedtoken.id);
      next();
    });
  } catch (e) {
    res.json({ error: "authentication failed" });
  }
};

module.exports = checkUser;
