var cheerio = require("cheerio");

var axios = require("axios");

var fox = "https://www.foxnews.com"

console.log("\n*****************************************\n" +
  "Grabbing titles and links from Fox News:" +
  "\n*****************************************\n");

// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
axios.get(fox).then(function (response) {
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  $("article.article").slice(0, 20).each(function (i, element) {

    var title = $(element).find("h2").text();
    var link = $(element).find('a').attr("href");
    var image = $(element).find('img').attr("src");

    results.push({
      title,
      link,
      image
    });
  });

  console.log(results);
});