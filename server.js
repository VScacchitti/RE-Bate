/* eslint-disable indent */
// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const googleTrends = require("google-trends-api");
const path = require("path");
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

// Finds topic to update

function getTrend() {
  return googleTrends
    .realTimeTrends({
      geo: "US",
      category: "h"
    })
    .then(results => {
      const resultsPar = JSON.parse(results);

      const topicTitle1 =
        resultsPar.storySummaries.trendingStories[0].articles[0].articleTitle;
      const topicUrL1 =
        resultsPar.storySummaries.trendingStories[0].articles[0].url;

      const topicTitle2 =
        resultsPar.storySummaries.trendingStories[1].articles[1].articleTitle;
      const topicUrL2 =
        resultsPar.storySummaries.trendingStories[1].articles[1].url;

      const topicTitle3 =
        resultsPar.storySummaries.trendingStories[2].articles[2].articleTitle;
      const topicUrL3 =
        resultsPar.storySummaries.trendingStories[2].articles[2].url;

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

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(async () => {
  // eslint-disable-next-line prettier/prettier
  //Gets topic from DB and inserts
  await getTrend();
  app.listen(PORT, () => console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    )
  );
});
