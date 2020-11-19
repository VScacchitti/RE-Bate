const db = require("../models");

module.exports = function(app) {
  app.get("/api/topics", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Topic.findAll({
      include: [db.Comment]
    }).then(dbAuthor => {
      res.json(dbAuthor);
    });
  });

  app.get("/api/topics/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Topic.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbTopic => {
      res.json(dbTopic);
    });
  });

  app.post("/api/topics", (req, res) => {
    db.Topic.create(req.body).then(dbTopic => {
      res.json(dbTopic);
    });
  });
};
