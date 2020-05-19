const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const readHistorySchema = new mongoose.Schema(
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
    timecount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReadHistory", readHistorySchema);
