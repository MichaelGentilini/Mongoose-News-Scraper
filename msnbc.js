var cheerio = require("cheerio");

var axios = require("axios");

var url = "https://www.nytimes.com/section/us"

console.log("\n\t\t**************************************\n" +
  "\t\tGrabbing titles and links from NY TIMES:" +
  "\n\t\t*************************************\n");

axios.get(url).then(function (response) {
  var $ = cheerio.load(response.data);
  console.log(url);

  var results = [];

  $("li.css-ye6x8s").each(function (i, element) {

    var title = $(element).find("h2").text();
    var link = $(element).find("a").attr("href");
    link = 'https://www.nytimes.com' + link
    var image = $(element).find("img").attr("src");

    results.push({
      title,
      link,
      image
    });
  });

  console.log(results);
});