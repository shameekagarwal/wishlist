const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishSchema = new Schema({
  owner: Schema.Types.ObjectId,
  wishList: [
    {
      title: String,
      description: String,
      link: String,
      image: String,
      reserved: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Wish = mongoose.model("wish", wishSchema);
module.exports = Wish;
