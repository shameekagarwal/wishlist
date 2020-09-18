const postWish = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    user.wishlist.push({ title, description });
    await user.save();
    res.json({ wish: user.wishlist[user.wishlist.length - 1] });
  } catch (e) {
    res.status(500).json({ error: "Adding wish failed." });
  }
};

const deleteWish = async (req, res) => {
  try {
    const { user } = req.body;
    const { wishid } = req.query;
    user.wishlist = user.wishlist.filter((wish) => wish._id != wishid);
    await user.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: "Deleting wish failed." });
  }
};

const getAllWishes = async (req, res) => {
  try {
    const { user } = req.body;
    const { wishlist } = user;
    res.json({ wishes: wishlist });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = { postWish, deleteWish, getAllWishes };
