var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
  // @ Get all records for the all page
  app.get("/all", function (req, res) {
    db.Article.find({}, null, {
      sort: {
        date: -1
      }
    }, function (err, data) {
      if (data.length === 0) {
        res.render("index", {
          message: "There's nothing scraped yet."
        });

      } else {
        res.render("all", {
          articles: data
        });
      }
    });
  });

  // ? Get Saved Articles
  app.get("/saved", function (req, res) {
    db.Article.find({
      isSaved: true
    }, function (err, data) {
      if (data.length === 0) {
        res.render("index", {
          message: "There's nothing scraped yet."
        });

      } else {
        res.render("saved", {
          saved: data
        });
      }
    });
  });

  // ? Get Saved Articles
  app.get("/saved/:id/:saved", function (req, res) {


    db.Article.findOneAndUpdate({
        _id: req.params.id
      }, {
        isSaved: req.params.saved
      })
      .then(function (err, data) {
        res.render("saved", {
          saved: data
        });
      });
  });

  app.get("/", function (req, res) {
    db.Article.find({}, null, {
      sort: {
        created: -1
      }
    }, function (err, data) {
      res.render("index", {
        message: "Where would you like to get your news?"
      })
    });
  });

  // ! Delete All Articles
  app.get("/delete", function (req, res) {
    db.Article.deleteMany({
        "isSaved": false
      })
      .then(function () {
        res.render("index", {
          message: "👀 It's time to search for articles!"
        });
      });
  });

  // ! Delete a single Article
  app.get("/delete/:id", function (req, res) {
    db.Article.deleteOne({
        _id: req.params.id
      })
      .then(function () {
        console.log('deleted', req.params.id)
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  // ? New York Times scraper  
  app.get("/nyt/scrape", function (req, res) {
    var nyt = "https://www.nytimes.com/section/us"
    axios.get(nyt).then(function (response) {
      var $ = cheerio.load(response.data);
     $("li.css-ye6x8s").slice(0, 10).each(function (i, element) {
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

        db.Article.create(result)
          .then(function (nytArticle) {
            // console.log(nytArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });

      console.log("############## Scrape Complete ##############");


      res.redirect('/nyt');
    });
  });

  // ? Get new york times results on new york times page
  app.get("/nyt", function (req, res) {
    db.Article.find({
      "source": "New York Times"
    }, null, {
      sort: {
        created: -1
      }
    }, function (err, data) {
      if (data.length === 0) {
        res.render("nyt", {
          // message: "There's nothing scraped yet."
        });
      } else {
        res.render("nyt", {
          articles: data
        });
      }
    });
  });

  // ! Fox scraper
  app.get("/fox/scrape", function (req, res) {
    var fox = "https://www.foxnews.com"

    axios.get(fox).then(function (response) {
      var $ = cheerio.load(response.data);
      $("article.article").slice(0, 10).each(function (i, element) {
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
        result.source = "Fox News";

        db.Article.create(result)
          .then(function (foxArticle) {
            // console.log(foxArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
      res.redirect('/fox');
      console.log("############## Scrape Complete ##############");
    });
  });

  // ! Get fox results on fox page
  app.get("/fox", function (req, res) {
    db.Article.find({
      "source": "Fox News"
    }, null, {
      sort: {
        created: -1
      }
    }, function (err, data) {
      if (data.length === 0) {
        res.render("fox", {
          // message: "There's nothing scraped yet."
        });
      } else {
        res.render("fox", {
          articles: data
        });
      }
    });
  });


  // @ Onion scraper
  app.get("/onion/scrape", function (req, res) {
    var onion = "https://theonion.com"

    axios.get(onion).then(function (response) {
      var $ = cheerio.load(response.data);
      $("article.js_post_item").slice(0, 10).each(function (i, element) {
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
        result.source = "The Onion";
        result.image = "img/onion-logo.jpg"

        //?? working on this for a random generated text
        //  result.summary = randomText;
        db.Article.create(result)
          .then(function (onionArticle) {
            // console.log(onionArticle);
          })

          .catch(function (err) {
            console.log(err);
          });
      });

      res.redirect('/onion');
      console.log("############## Scrape Complete ##############");
    });

    function getRandomText() {
      axios.get("http://www.randomtext.me/api/gibberish/p-1-2/12-25")
        .then(function (response) {
          var randomText = response.data["text_out"].replace(/<\/?[^>]+(>|$)/g, "");
          return randomText
        });
    }
  });

  // @ Get onion results on onion page
  app.get("/onion", function (req, res) {
    db.Article.find({
      "source": "The Onion"
    }, null, {
      sort: {
        created: -1
      }
    }, function (err, data) {
      if (data.length === 0) {
        res.render("onion", {
          // message: "There's nothing scraped yet."
        });
      } else {
        res.render("onion", {
          articles: data
        });
      }
    });
  });



  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/all/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({
        _id: req.params.id
      })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function (dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.render("index", {
          "note": dbArticle
        })
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/all/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Article.findOneAndUpdate({
          _id: req.params.id
        }, {
          note: dbNote._id
        }, {
          new: true
        });
      })
      .then(function (dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};