/* eslint-disable indent */
// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
//const times = require("lodash.times");
//const random = require("lodash.random");
//const faker = require("faker");
const path = require("path");
// Requiring passport as we've configured it
const authorRoute = require("./routes/api-routes-author");
const commentRoute = require("./routes/api-routes-comment");

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
authorRoute(app, db);
commentRoute(app, db);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  // populate author table with dummy data
  /*db.author.bulkCreate(
    times(5, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  );
  // populate post table with dummy data
  db.comment.bulkCreate(
    times(5, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 5)
    }))
  );*/
  // eslint-disable-next-line prettier/prettier
  app.listen(PORT, () => console.log(
      // eslint-disable-next-line indent
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    )
  );
});