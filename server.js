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
let topicTitle;
let topicUrL;
let debateTopic;

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
db.Topic.findOne({
  where: {
    id: 1
  }
}).then(dbTopic => {
  if (dbTopic) {
    updateTrend();
  } else {
    getTrend();
  }
});

function getTrend() {
  googleTrends
    .realTimeTrends({
      geo: "US",
      category: "h"
    })
    .then(results => {
      const resultsPar = JSON.parse(results);

      topicTitle =
        resultsPar.storySummaries.trendingStories[0].articles[0].articleTitle;
      topicUrL = resultsPar.storySummaries.trendingStories[0].articles[0].url;
      debateTopic = {
        title: topicTitle,
        URL: topicUrL
      };
      console.log(debateTopic);

      db.Topic.create({
        topic: topicTitle,
        URL: topicUrL
      });
    })
    .catch(err => {
      console.error(err);
    });
}
getTrend();

function updateTrend() {
  googleTrends
    .realTimeTrends({
      geo: "US",
      category: "h"
    })
    .then(results => {
      const resultsPar = JSON.parse(results);

      topicTitle =
        resultsPar.storySummaries.trendingStories[0].articles[0].articleTitle;
      topicUrL = resultsPar.storySummaries.trendingStories[0].articles[0].url;
      debateTopic = {
        title: topicTitle,
        URL: topicUrL
      };
      console.log(debateTopic);

      db.Topic.update(
        {
          topic: topicTitle,
          URL: topicUrL
        },
        {
          where: {
            id: 1
          }
        }
      );
    })
    .catch(err => {
      console.error(err);
    });
}
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    )
  );
});
