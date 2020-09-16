const postWish = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    user.wishlist.push({ title, description });
    await user.save();
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: "adding wish failed" });
  }
};

const deleteWish = async (req, res) => {
  try {
    const { user, wishid } = req.body;
    user.wishlist = user.wishlist.filter((wish) => wish._id != wishid);
    await user.save();
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: "deleting wish failed" });
  }
};

const getAllWishes = async (req, res) => {
  try {
    const { user } = req.body;
    const { wishlist } = user;
    res.json({ success: true, wishes: wishlist });
  } catch (e) {
    res.json({ success: false, error: "getting wishlist(private) failed" });
  }
};

module.exports = { postWish, deleteWish, getAllWishes };
