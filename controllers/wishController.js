const postWish = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    user.wishlist.push({ title, description });
    await user.save();
    res.json({ wishes: user.wishlist });
  } catch (e) {
    res.json({ error: "adding wish failed" });
  }
};

const getWishes = async (req, res) => {
  try {
    const { user } = req.body;
    const { wishlist } = user;
    res.json({ wishes: wishlist });
  } catch (e) {
    res.json({ error: "getting wishlist failed" });
  }
};

module.exports = { postWish, getWishes };
