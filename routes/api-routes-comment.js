// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  // eslint-disable-next-line prettier/prettier
  app.get("/api/comments", (req, res) => db.Comment.findAll().then(result => res.json(result))
  );

  // Get route for retrieving a single post
  app.get("/api/comments/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(dbComment => {
      res.json(dbComment);
    });
  });

  // POST route for saving a new post
  app.post("/api/comments", (req, res) => {
    db.Comment.create(req.body).then(dbComment => {
      res.json(dbComment);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/comments/:id", (req, res) => {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbComment => {
      res.json(dbComment);
    });
  });

  // PUT route for updating posts
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
