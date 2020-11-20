/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const googleTrends = require("google-trends-api");
//const random = require("lodash.random");
const path = require("path");
// Requiring passport as we've configured it
const commentRoute = require("./routes/api-routes-comment");
const trendRoute = require("./routes/api-routes-topics");
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "handlebars");
//Sets handlebars configurations (we will go through them later on)
app.engine(
  "handlebars",
  exphbs({
    layoutsDir: path.join(__dirname + "/views/layouts")
  })
);
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("main", { layout: "index" });
});

//Routes
commentRoute(app, db);
trendRoute(app, db);

//Gets topic from DB and inserts
getTrend();

// Finds topic to update

function getTrend() {
  googleTrends
    .realTimeTrends({
      geo: "US",
      category: "h"
    })
    .then(results => {
      const resultsPar = JSON.parse(results);

      topicTitle1 =
        resultsPar.storySummaries.trendingStories[0].articles[0].articleTitle;
      topicUrL1 = resultsPar.storySummaries.trendingStories[0].articles[0].url;

      topicTitle2 =
      resultsPar.storySummaries.trendingStories[1].articles[1].articleTitle;
    topicUrL2 = resultsPar.storySummaries.trendingStories[1].articles[1].url;

    topicTitle3 =
    resultsPar.storySummaries.trendingStories[2].articles[2].articleTitle;
  topicUrL3 = resultsPar.storySummaries.trendingStories[2].articles[2].url;

      db.Topic.create({
        topic: topicTitle1,
        URL: topicUrL1
      });

      db.Topic.create({
        topic: topicTitle2,
        URL: topicUrL2
      });

      db.Topic.create({
        topic: topicTitle3,
        URL: topicUrL3
      });
    })
    .catch(err => {
      console.error(err);
    });
}

getTrend();

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    )
  );
});
