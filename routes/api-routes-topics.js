const db = require("../models");

module.exports = function(app) {
  app.get("/api/topics", (req, res) => {
    db.Topic.findAll({}).then(dbTopic => {
      res.json(dbTopic);
    });
  });

  app.get("/api/topics/:id", (req, res) => {
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
