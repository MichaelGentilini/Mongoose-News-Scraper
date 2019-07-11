var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var app = express();

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// ! Connect to the Mongo DB
mongoose.connect("mongodb://localhost/news-scraper", {
  useNewUrlParser: true
});


// ! Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
  console.log(
    "\n🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT);
});

module.exports = app;