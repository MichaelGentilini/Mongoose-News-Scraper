// ? display NYT articles

// e.preventDefault();
$.getJSON("/nyt/scrape/api", function (data) {
  // For each one
  console.log(data);
  for (var i = 0; i < data.length; i++) {

    // Display the apropos information on the page
    $("#nytResults").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});