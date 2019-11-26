const express = require("express");

const router = express.Router();

const article = require('../models/Article');

router.get("/", (req, res) => {
    // article.find((data) => {
    //     var hbsObject = {
    //       scraper: data
    //     };    
    res.render("index", {layout: false});
    });
//});


  module.exports = router;