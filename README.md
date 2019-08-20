# Mongoose-News-Scraper

Mongoose News Scraper is a web app that lets users view, save, and leave comments on recent news articles.

See it live: [https://my-mongoose-news-scraper.herokuapp.com/](https://my-mongoose-news-scraper.herokuapp.com/)

Find the source code: [GitHub](https://github.com/dallasappraiser/Mongoose-News-Scraper)

<code>npm start

- The user can choose The New York Times, Fox News, or The Onion as their news source
- If articles are available, the user can also choose to view all articles
- Once the news source is selected, if there are no articles the user can select scrape in order to grab the 10 most recent articles
- once the articles load, the user has the option to add a note, save it, or delete it.
- on the top the user can delete all articles that are not saved or view all of their saved articles.

This is a full stack application which uses:

**(back end)**

- Express
- Handlebars
- MongoDB (no sql database)
- cheerio (web scraping)
- deployed on Heroku with mLab
- nodemon to make reloading faster

 **(front end)**

- Bootstrap
- JQuery
- Sweet Alert2 - *love the modals!*
