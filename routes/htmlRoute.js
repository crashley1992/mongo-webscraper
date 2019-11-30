const express = require("express");
const exphbs = require("express-handlebars");

const router = express.Router();

const article = require('../models/Article');

router.get("/", (req, res) => {
       //renders index handle bars layout
    res.render("index");
  });

  module.exports = router;