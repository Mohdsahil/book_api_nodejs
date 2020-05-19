const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    book: {
      type: ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    rating: Number,
    review: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
