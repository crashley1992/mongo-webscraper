const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const router = express.Router();

const db = require('../models');

router.get("/articles", (req, res) => {
//queries for articles in mongo and sorts by most recent 
  db.Article.find().sort({timestamp: -1})
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Route for grabbing a specific Article by id
router.get("/articles/:id", (req, res) => {
  db.Article.findById({ _id: req.params.id })
    .populate("note")
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", (req, res) => {
console.log(req.body);
  db.Note.create(req.body)
    .then((dbNote) => {
      return db.Article.findByIdAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;