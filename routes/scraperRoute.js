const express = require('express')
const cheerio = require("cheerio");
const axios = require("axios");

const router = express.Router();

const article = require('../models/Article')
const db = require('../models');

router.get("/scraper", (req, res) => {

  // Make a request via axios to grab the HTML body from the site of your choice
  axios.get("https://www.nytimes.com").then((response) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    let $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    let results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("article").each((i, element) => {

      let title = $(element).children().text();
      let link = $(element).find("a").attr("href");

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        link: link
      });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
    res.json(results);

    // Create a new Article using the `result` object built from scraping
    db.Article.create(results)
      .then(function (dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
});

module.exports = router;