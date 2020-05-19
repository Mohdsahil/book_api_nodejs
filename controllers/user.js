const User = require("../models/user");
const ReadHistory = require("../models/readedHistory");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.enc_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({ error: "Error to update the user" });
      }
      (user.salt = undefined), (user.enc_password = undefined);
      res.json(user);
    }
  );
};

exports.userReadedBookList = (req, res) => {
  ReadHistory.find(
    { user: req.profile._id }
      .populate("user", "_id book")
      .exec((err, readedBook) => {
        if (err) {
          return res.status(400).json({
            error: "No Book read Yed",
          });
        }
        return res.json(readedBook);
      })
  );
};

exports.getUserByMaxReadedTime = (req, res) => {
  ReadHistory.find()
    .populate("user", "name email")
    .populate("book", "name author description")
    .sort([["timecount", "desc"]])
    .exec((err, readedHistorys) => {
      if (err) {
        return res.status(400).json({
          error: "No History found",
        });
      }
      res.json(readedHistorys);
    });
};
