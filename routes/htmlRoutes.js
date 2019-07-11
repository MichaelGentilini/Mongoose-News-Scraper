module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render('index');
  });

  app.get("/nyt", function (req, res) {
    res.render('nyt');
  });

  app.get("/fox", function (req, res) {
    res.render('fox');
  });

  app.get("/onion", function (req, res) {
    res.render('onion');
  });

  app.get("/saved", function (req, res) {
    res.render('saved');
  });

  app.get("/", function (req, res) {
    res.render('index');
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};