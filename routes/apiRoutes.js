var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {


  app.get("/", function (req, res) {
    db.Article.find({}, null, {
      sort: {
        date: -1
      }
    }, function (err, data) {
      console.log("======================================================================= HERE'S THE DATA =============================================", data);
      if (data.length === 0) {
        res.render("placeholder", {
          message: "There's nothing scraped yet. Please click \"Scrape For Newest Articles\" for fresh and delicious news."
        });

      } else {
        res.render("index", {
          articles: data
        });
      }
    });
  });

  // ? New York Times scraper  
  app.get("/nyt/api", function (req, res) {
    var nyt = "https://www.nytimes.com/section/us"
    // First, we grab the body of the html with axios
    axios.get(nyt).then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:

      $("li.css-ye6x8s").slice(0, 5).each(function (i, element) {
        var result = {};
        result.title = $(this)
          .find("h2")
          .text();
        result.link = "https://www.nytimes.com" + $(this)
          .find("a").
        attr("href");
        result.summary = $(this)
          .find("p")
          .text();
        result.image = $(this)
          .find("img")
          .attr("src")
        result.source = "New York Times";

        // Create a new Article using the `articles` object built from scraping  
        db.Article.create(result)

          .then(function (nytArticle) {
            // view new articles
            console.log(nytArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      console.log("############## Scrape Complete ##############");


      res.redirect('/nyt');
    });
  });


  // // ? Route for getting all New York Times Articles from the db
  // app.get("/nyt", function (req, res) {
  //   // Grab every document in the Articles collection
  //   db.Article.find({})
  //     .then(function (dbArticle) {
  //       // If we were able to successfully find Articles, send them back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function (err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

  // ! Fox scraper
  app.get("/fox/api", function (req, res) {
    var fox = "https://www.foxnews.com"

    axios.get(fox).then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("article.article").slice(0, 5).each(function (i, element) {
        var result = {};

        result.title = $(this)
          .find("h2")
          .text();
        result.link = $(this)
          .find('a')
          .attr("href");
        result.image = $(this)
          .find('img')
          .attr("src");
        result.summary = "follow the link to find out more";
        result.source = "Fox News";

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (foxArticle) {
            // View the added result in the console
            console.log(foxArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      // Send a message to the client
      res.redirect('/fox');
      console.log("############## Scrape Complete ##############");
    });
  });



  // @ Onion scraper
  app.get("/onion/api", function (req, res) {
    var onion = "https://theonion.com"

    axios.get(onion).then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("article.js_post_item").slice(0, 5).each(function (i, element) {
        var result = {};
        if (result.link === undefined) {
          result.link = $(this)
            .find('a')
            .attr("href");
        }
        result.title = $(this)
          .find("h1")
          .text();
        result.link = $(this)
          .find("figure")
          .children()
          .attr("href");
        result.summary = "follow the link to find out more";
        result.source = "The Onion";
        result.image = "img/onion-logo.jpg"
        // result.image = "https://www.thewrap.com/wp-content/uploads/2015/06/onion-logo.jpg"
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (onionArticle) {
            // View the added result in the console
            console.log(onionArticle);
          })

          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      res.redirect('/onion');
      // Send a message to the client in the console
      console.log("############## Scrape Complete ##############");
    });
  });


  // Get Saved Articles
  app.get("/saved", function (req, res) {
    db.Article.find({
      saved: true
    }, null, {
      sort: {
        created: -1
      }
    }, function (err, data) {
      if (data.length === 0) {
        res.render("saved", {
          message: "You have not saved any articles yet."
        });
      } else {
        res.render("saved", {
          saved: data
        });
      }
    });
  });

  app.get("/", function (req, res) {
    Article.find({}, null, {
      sort: {
        created: -1
      }
    }, function (err, data) {
      if (data.length === 0) {
        res.render("placeholder", {
          message: "There's nothing scraped yet. Please click a button above for some news."
        });
      } else {
        res.render("index", {
          articles: data
        });
      }
    });
  });

  // // Route for grabbing a specific Article by id, populate it with it's note
  // app.get("/articles/:id", function (req, res) {
  //   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  //   db.Article.findOne({
  //       _id: req.params.id
  //     })
  //     // ..and populate all of the notes associated with it
  //     .populate("note")
  //     .then(function (dbArticle) {
  //       // If we were able to successfully find an Article with the given id, send it back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function (err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

  // // Route for saving/updating an Article's associated Note
  // app.post("/articles/:id", function (req, res) {
  //   // Create a new note and pass the req.body to the entry
  //   db.Note.create(req.body)
  //     .then(function (dbNote) {
  //       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
  //       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
  //       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
  //       return db.Article.findOneAndUpdate({
  //         _id: req.params.id
  //       }, {
  //         note: dbNote._id
  //       }, {
  //         new: true
  //       });
  //     })
  //     .then(function (dbArticle) {
  //       // If we were able to successfully update an Article, send it back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function (err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });
};