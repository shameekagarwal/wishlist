const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: 36000,
  });
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (!exists) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect username or password" });
    }
    const user = await User.login(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect username or password." });
    }
    const token = createToken(user._id);
    res.json({ success: true, token, user });
  } catch (e) {
    res.status(500).json({ success: false, error: "login failed" });
  }
};

const postSignup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        error: "An account with this email already exists.",
      });
    }
    await User.create({ email, password, name });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: "Server error." });
  }
};

module.exports = { postLogin, postSignup };
