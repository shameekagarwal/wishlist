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
    const user = await User.login(email, password);
    if (!user) {
      return res.json({ error: "email doesnt exist" });
    }
    const token = createToken(user._id);
    res.json({ token, user });
  } catch (e) {
    res.json({ error: "login failed" });
  }
};

const postSignup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ error: "email already exists" });
    }
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    res.json({ token, user });
  } catch (e) {
    res.json({ error: "signup failed" });
  }
};

module.exports = { postLogin, postSignup };
