const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wish = require("../models/Wish");

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
      return res.status(401).json({ error: "Incorrect username or password" });
    }
    const user = await User.login(email, password);
    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password." });
    }
    const token = createToken(user._id);
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ error: "login failed" });
  }
};

const postSignup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ error: "An account with this email already exists." });
    }
    const user = await User.create({ email, password, name });
    await Wish.create({ owner: user._id });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { postLogin, postSignup };
