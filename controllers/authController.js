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
      return res.json({ success: false, error: "email doesnt exist" });
    }
    const user = await User.login(email, password);
    if (!user) {
      return res.json({ success: false, error: "incorrect password" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token, user });
  } catch (e) {
    res.json({ success: false, error: "login failed" });
  }
};

const postSignup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, error: "email already exists" });
    }
    await User.create({ email, password, username });
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: "signup failed" });
  }
};

module.exports = { postLogin, postSignup };
