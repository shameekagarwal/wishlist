const User = require("../models/User");

const getWishesPublic = async (req, res) => {
  try {
    const shareablelink = req.params.id;
    const user = await User.findOne({ shareablelink });
    if (!user) {
      return res.json({ success: false, error: "shareable link doesnt exist" });
    }
    res.json({ success: true, wishlist: user.wishlist });
  } catch (e) {
    res.json({ success: false, error: "getting wishlist(public) failed" });
  }
};

module.exports = getWishesPublic;
