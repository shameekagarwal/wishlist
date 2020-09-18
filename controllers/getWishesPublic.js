const User = require("../models/User");
const Wish = require("../models/Wish");

const getWishesPublic = async (req, res) => {
  try {
    const shareablelink = req.params.id;
    const user = await User.findOne({ shareablelink });
    if (!user) {
      return res.status(404).json({ error: "Invalid Link" });
    }
    const wishes = await Wish.findOne({ owner: user._id });
    res.json({ name: user.name, wishes: wishes.wishList });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = getWishesPublic;
