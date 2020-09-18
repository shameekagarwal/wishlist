const Wish = require("../models/Wish");

const postWish = async (req, res) => {
  try {
    const { wish, user } = req.body;
    const { title, description, link, image } = wish;
    let wishes = await Wish.findOne({ owner: user._id });
    wishes.wishList.push({ title, description, link, image });
    await wishes.save();
    res.json({ wish: wishes[wishes.length - 1] });
  } catch (e) {
    res.status(500).json({ error: "Adding wish failed." });
  }
};

const deleteWish = async (req, res) => {
  try {
    const { user } = req.body;
    const { wishid } = req.query;
    const wishes = await Wish.findOne({ owner: user._id });
    wishes.wishList = wishes.wishList.filter((wish) => wish._id != wishid);
    await wishes.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Deleting wish failed." });
  }
};

const getAllWishes = async (req, res) => {
  try {
    const { user } = req.body;
    const wishes = await Wish.findOne({ owner: user._id });
    res.json({ wishes: wishes.wishList });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = { postWish, deleteWish, getAllWishes };
