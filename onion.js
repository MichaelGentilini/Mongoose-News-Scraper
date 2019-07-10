var cheerio = require("cheerio");
var axios = require("axios");


console.log("\n*****************************************\n" +
  "Grabbing titles and links from The Onion:" +
  "\n*****************************************\n");

axios.get("https://theonion.com").then(function (response) {


  var $ = cheerio.load(response.data);
  var results = [];

  // (i: iterator. element: the current element) == i is required 
  $("article.js_post_item").slice(0, 10).each(function (i, element) {
    // console.log(i, "element", $(element).children())

    var title = $(element).find("h1").text();
    var link = $(element).find("figure").children().attr("href");
    if (link === undefined) {
      link = $(element).find('a').attr("href");
      console.log('hello');
    }
    // var link2 = $(element).children().children()[2].attribs
    // var link3 = $(element).children().children().attr("class", "js_save-badge'")
    // console.log(link2)

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title,
      link,
      //? this is the best link if I can get to it => link2
    });
  });

  console.log(results);
});