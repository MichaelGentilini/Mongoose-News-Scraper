var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
// * not sure what this does but found it online

mongoose.set('debug', true);


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

var collection = "news-scraper"

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/" + collection;

// @ Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

mongoose.Promise = Promise;
var db = mongoose.connection;

db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function () {
  console.log("Mongoose connection to the " + collection + " collection successful.");
});


// ! Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Render 404 page for any unmatched routes
app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, function () {
  console.log(
    "\n🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT);
});

module.exports = app;