const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlenght: 50,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      require: true,
      trim: true,
      maxlenght: 35,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    language: {
      type: String,
      require: true,
      trim: true,
    },
    pdf: String,
    thumbnail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
