const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  wishlist: [
    {
      title: String,
      description: String,
    },
  ],
  shareablelink: String,
  passresetlink: String,
  passresettime: Date,
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  if (user.shareablelink) return next();
  user.shareablelink = user._id + crypto.randomBytes(20).toString("hex");
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const passwordcheck = await bcrypt.compare(password, user.password);
    if (passwordcheck) {
      return user;
    }
    return null;
  }
  return null;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
