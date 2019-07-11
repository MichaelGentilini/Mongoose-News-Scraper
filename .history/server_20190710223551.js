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
// require("./routes/htmlRoutes")(app);
// require("./routes/apiRoutes")(app);

app.get("/api/nyt/scrape", function (req, res) {
  // var nyt = "https://www.nytimes.com/section/us"
  console.log("ROUTE HIT")
  // First, we grab the body of the html with axios
  // axios.get(nyt).then(function (response) {
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   var $ = cheerio.load(response.data);
  //   console.log(nyt);
  //   // Now, we grab every h2 within an article tag, and do the following:
  //   $("li.css-ye6x8s").each(function (i, element) {
  //     var result = {};

  //     result.title = $(this)
  //       .find("h2")
  //       .text();
  //     result.link = $(this)
  //       .find("a").
  //     attr("href");
  //     // result.image = $(this)
  //     //   .find("img")
  //     //   .attr("src");
  //     // Create a new Article using the `result` object built from scraping
  //     db.Article.create(result)
  //       .then(function (dbArticle) {
  //         // View the added result in the console
  //         console.log(dbArticle);
  //       })
  //       .catch(function (err) {
  //         // If an error occurred, log it
  //         console.log(err);
  //       });
  //   });
    // Send a message to the client
    res.send("Scrape Complete");
    console.log("Scrape Complete");
  });
//});

app.listen(PORT, function () {
  console.log(
    "\n🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT);
});

module.exports = app;