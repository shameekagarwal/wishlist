const User = require("../models/User");

const getWishesPublic = async (req, res) => {
  try {
    const shareablelink = req.params.id;
    const user = await User.findOne({ shareablelink });
    if (!user) {
      return res.status(404).json({ error: "Invalid Link" });
    }
    res.json({ name: user.name, wishes: user.wishlist });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = getWishesPublic;
