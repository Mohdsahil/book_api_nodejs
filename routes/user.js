const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userReadedBookList,
  getUserByMaxReadedTime,
} = require("../controllers/user");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
// get user
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// update the user profile
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
// get the user readed book list
router.get(
  "/readed/book/:userId",
  isSignedIn,
  isAuthenticated,
  userReadedBookList
);

router.get(
  "/readed/maxtime",
  // isSignedIn,
  // isAuthenticated,
  // isAdmin,
  getUserByMaxReadedTime
);

module.exports = router;
