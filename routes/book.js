const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());

const {
  getBookById,
  createBook,
  getBook,
  thumbnail,
  pdf,
  deleteBook,
  updaeBook,
  getAllBook,
  getAllUniqueCategories,
} = require("../controllers/book");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("bookId", getBookById);

// My routes
router.post(
  "/book/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createBook
);

router.get("/book/:bookId", getBook);

router.get("/book/thumbnail/:bookId", thumbnail);
router.get("/book/pdf/:bookId", pdf);

router.delete(
  "/book/:bookId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteBook
);

router.get("/books", getAllBook);
router.get("/books/categories", getAllUniqueCategories);

module.exports = router;
