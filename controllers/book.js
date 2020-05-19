const Book = require("../models/book");
const formidable = require("formidable");
const fileUpload = require("express-fileupload");

const _ = require("lodash");
const fs = require("fs");

exports.getBookById = (req, res, next, id) => {
  Book.findById(id)
    .populate("category")
    .exec((err, book) => {
      if (err || !book) {
        return res.status(400).json({ error: "Book not found" });
      }
      req.book = book;
      next();
    });
};

exports.getBook = (req, res) => {
  req.book.thumbnail = undefined;
  req.book.pdf = undefined;
  return res.json(req.book);
};

exports.thumbnail = (req, res) => {
  if (req.body) {
    return res.send(req.book.thumbnail);
  }
};
exports.pdf = (req, res) => {
  if (req.body) {
    return res.send(req.book.pdf);
  }
};

exports.createBook = (req, res) => {
  const data = req.body;
  // console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }
  let pdf = req.files.pdf;
  let thumbnail = req.files.thumbnail;
  pdf.name = Date.now() + "_" + pdf.name;
  thumbnail.name = Date.now() + "_" + thumbnail.name;

  let book_path = "http://localhost:7000/books" + "/" + pdf.name;
  let thumbnail_path = "http://localhost:7000/thumbnail" + "/" + thumbnail.name;
  pdf.mv("upload/books/" + pdf.name, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "internal server error to upload the book ",
      });
    }
  });
  thumbnail.mv("upload/thumbnail/" + thumbnail.name, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "internal server error to upload the book ",
      });
    }
  });

  let book = new Book(data);

  book.thumbnail = thumbnail_path;
  book.pdf = book_path;

  book.save((err, book) => {
    if (err) {
      res.status(400).json({
        error: "error to upload the book",
      });
    }
    res.json(book);
  });
};

exports.deleteBook = (req, res) => {
  let book = req.book;
  book.remove((err, deletedBook) => {
    if (err || !deletedBook) {
      return res.status(400).json({
        error: "Error to remove the book",
      });
    }
    res.json({
      message: "Book removed successfully",
      deletedBook,
    });
  });
};

exports.getAllBook = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Book.find()
    .select("-pdf")
    .populate("category")
    .sort([["_id", "desc"]])
    .exec((err, books) => {
      if (err || !books) {
        return res.status(400).json({
          error: "Result not found",
        });
      }
      res.json(books);
    });
};
exports.getAllUniqueCategories = (req, res) => {
  Book.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};
