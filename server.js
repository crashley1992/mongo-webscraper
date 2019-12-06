//dependencies
const express = require("express");
const mongojs = require('mongojs');
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const exphbs = require("express-handlebars");

require('dotenv').config()

//axios and cheerio for scraper
const axios = require('axios');
const cheerio = require('cheerio');

const db = require('./models');
// const publicPath = path.join(__dirname, '../views');

const PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newYorkTimesArticles";
mongoose.connect(MONGODB_URI);

//mongoose.connect("mongodb://localhost/newYorkTimesArticles", { useNewUrlParser: true });

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const scraperRoute = require("./routes/scraperRoute");
const articleRoute = require('./routes/articleRoutes');
const htmlRoute = require('./routes/htmlRoute');

app.use('/data', scraperRoute);
app.use('/api', articleRoute);
app.use(htmlRoute);

app.listen(PORT, () => {
  console.log("App now listening at localhost:" + PORT);
});
