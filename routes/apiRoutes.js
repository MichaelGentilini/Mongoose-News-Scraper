var db = require("../models");
// var axios = require("axios");
// var cheerio = require("cheerio");

module.exports = function (app) {
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

  // @ Get all records for the all page
  app.get("/all", function (req, res) {
    db.Article.find({}, null, {
      sort: {
        date: -1
      }
    }, function (err, data) {
      res.render("all", {
        articles: data
      });
    });
  });

  // ! This is redundant
  // ? List Saved Articles on the Saved Page
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

  // ? Get specific Saved Articles
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

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/notes/:id", function (req, res) {

    db.Article.findOne({
        _id: req.params.id
      })
      // ..and populate the note associated with it
      .populate("note")
      .then(function (dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        console.log('Success!', dbArticle);
        res.json(dbArticle);
      })
      .catch(function (err) {
        console.log('SOmething Didn\'t Go Wright')
        // If an error occurred, send it to the client
        res.json(err);

      });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/notes/:id", function (req, res) {
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

  app.get("/getnote/:id", function (req, res) {
    db.Note.findOne({
        _id: req.params.id,
      })
      .then(function (dbNote) {
        console.log(dbNote);
        res.json(dbNote);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

}; // * module exports


// // & Event Listener for viewing aNote
// $(".viewNote").on("click", function (e) {
//   e.preventDefault();
//   var $thisId = $(this).attr("note-id");
//   console.log($thisId)
//   $.ajax({
//     method: "Get",
//     url: "/getnote" + $thisId
//   }).then(function (data) {
//     console.log(data);

//     // success: function () {
//     //   Swal.fire({
//     //     type: 'success',
//     //     text: 'Article Saved'
//     //   });
//   })
// });