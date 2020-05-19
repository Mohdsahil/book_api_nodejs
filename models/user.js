var mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const { v1: uuidv1 } = require("uuid");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 35,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    readedBooks: {
      type: Array,
      default: [],
    },
    role: {
      type: Number,
      default: 0,
    },
    enc_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

// create virtual filed as password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.enc_password = this.encryptedPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (planepassword) {
    return this.encryptedPassword(planepassword) === this.enc_password;
  },

  encryptedPassword: function (planepassword) {
    if (!planepassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(planepassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
