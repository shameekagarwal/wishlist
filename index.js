const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const { postLogin, postSignup } = require("./controllers/authController");

const {
  resetPasswordLink,
  resetShareableLink,
  resetPassword,
} = require("./controllers/resetController");

const {
  postWish,
  deleteWish,
  getAllWishes,
} = require("./controllers/wishController");

const getWishesPublic = require("./controllers/getWishesPublic");

const checkUser = require("./middlewares/checkUser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((r) => console.log("connected to atlas"))
  .catch((e) => console.log("error in connecting to atlas"));

app.post("/auth/signup", postSignup);
app.post("/auth/login", postLogin);

app.post("/api/wish", checkUser, postWish);
app.delete("/api/wish", checkUser, deleteWish);
app.get("/api/wishes", checkUser, getAllWishes);

app.get("/api/sharedwishlist/:id", getWishesPublic);

app.post("/api/passwordEmail", resetPasswordLink);
app.post("/api/resetShareLink", checkUser, resetShareableLink);
app.post("/api/changePassword", resetPassword);

app.listen(process.env.PORT, console.log("http://localhost:3000"));
