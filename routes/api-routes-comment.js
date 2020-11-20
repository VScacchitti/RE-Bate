/* eslint-disable prettier/prettier */
// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/comments", (req, res) => db.Comment.findAll().then(result => res.json(result))
  );

  app.get("/api/comments/:name", (req, res) => db.Comment.findAll().then(result => res.json(result))
  );

  app.get("/api/comments/:title", (req, res) => db.Comment.findAll().then(result => res.json(result))
  );

  app.get("/api/comments/:content", (req, res) => db.Comment.findAll().then(result => res.json(result))
  );

  // Get route for retrieving a single comment
  app.get("/api/comments/:id", (req, res) => {
   
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
    }).then(dbComment => {
      res.json(dbComment);
    });
  });

  // POST route for saving a new comment
  app.post("/api/comments", (req, res) => {
    db.Comment.create(req.body).then(dbComment => {
      res.json(dbComment);
    });
  });

  // DELETE route for deleting comment
  app.delete("/api/comments/:id", (req, res) => {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbComment => {
      res.json(dbComment);
    });
  });

  app.put("/api/commments", (req, res) => {
    db.Comment.update(req.content, {
      where: {
        id: req.content.id
      }
    }).then(dbComment => {
      res.json(dbComment);
    });
  });
};
