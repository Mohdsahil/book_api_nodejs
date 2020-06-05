const ReadedHistory = require("../models/readedHistory");
const Review = require("../models/review");

// Create readed history
exports.createReadedHistory = (req, res) => {
  let readedHistory = new ReadedHistory({
    user: req.profile._id,
    book: req.book._id,
    timecount: req.body.timecount,
  });

  let review = new Review({
    user: req.profile._id,
    book: req.book._id,
    rating: req.body.rating,
    review: req.body.review,
  });

  readedHistory.save((err, submitHistory) => {
    if (err) {
      return res.status(400).json({
        error: "Error to store the history",
      });
    }

    review.save((err, submitReview) => {
      if (err) {
        res.status(400).json({
          error: " error to store the history",
        });
      }
      res.json({
        submitHistory: submitHistory,
        submitReview: submitReview,
      });
    });
  });
};

exports.getReviewById = (req, res, next, id) => {
  Review.findById(id).exec((err, review) => {
    if (err || !review) {
      return res.status(400).json({ error: "Review Not found" });
    }
    req.review = review;
    next();
  });
};

exports.getReviewByBookId = (req, res) => {
  Book.find({ book: req.book })
    .populate("user", "email")
    .sort([["_id", "desc"]])
    .exec((err, reviews) => {
      if (err) {
        return res.status(400).json({
          error: "No Review found",
        });
      }
      res.json(reviews);
    });
};

exports.getAllReview = (req, res) => {
  Review.find()
    .populate("user", "name email")
    .populate("book", "name author")
    .sort([["_id", "desc"]])
    .exec((err, reviews) => {
      if (err || !reviews) {
        return res.status(400).json({
          error: "No Review Found",
        });
      }
      res.json(reviews);
    });
};

exports.deleteReview = (req, res) => {
  let review = req.review;

  review.remove((err, deletedReview) => {
    if (err || !deletedReview) {
      return res.status(400).json({
        error: "Error to remove the book",
      });
    }
    res.json({
      message: "Review Deleted Successfully",
      deletedReview,
    });
  });
};
