/* eslint-disable indent */
// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const times = require("lodash.times");
const googleTrends = require("google-trends-api");
//const random = require("lodash.random");
const faker = require("faker");
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

function getTrend() {
  googleTrends
    .realTimeTrends({
      geo: "US",
      category: "h"
    })
    .then(results => {
      const resultsPar = JSON.parse(results);
      //var resultsStr = JSON.stringify(results);
      // console.log(results)
      //console.log(resultsStr)
      const topicTitle =
        resultsPar.storySummaries.trendingStories[0].articles[0].articleTitle;
      const topicUrL =
        resultsPar.storySummaries.trendingStories[0].articles[0].url;
      const debateTopic = {
        title: topicTitle,
        URL: topicUrL
      };
      console.log(debateTopic);
    })
    .catch(err => {
      console.error(err);
    });
}
getTrend();

app.post("/api/topics", (req, res) => {
  db.Topic.create({
    topic: debateTopic.title,
    URL: debateTopic.URL
  }).then(dbTopic => {
    console.log(dbTopic);
    res.json(dbTopic);
  });
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  // populate author table with dummy data
  // populate post table with dummy data
  db.Comment.bulkCreate(
    times(1, () => ({
      name: faker.name.firstName(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph()
    }))
  );

  // eslint-disable-next-line prettier/prettier
  app.listen(PORT, () => console.log(
      // eslint-disable-next-line indent
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    )
  );
});
