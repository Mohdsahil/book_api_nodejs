const express = require("express");
const router = express.Router();

const {
  createReadedHistory,
  getReviewByUserId,
  getReviewByBookId,
  getAllReview,
} = require("../controllers/review");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");
const { getBookById } = require("../controllers/book");

router.param("userId", getUserById);
router.param("bookId", getBookById);

// My routes
router.get("/reviews/book", isSignedIn, isAuthenticated, isAdmin, getAllReview);
router.get("/book/bookreview/:bookId", getReviewByBookId);
router.post(
  "/book/readed/:userId/:bookId",
  isSignedIn,
  isAuthenticated,
  createReadedHistory
);

module.exports = router;
