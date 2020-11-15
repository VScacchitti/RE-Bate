/* eslint-disable prettier/prettier */
module.exports = (app, db) => {
  app.get("/comments", (req, res) => db.comment.findAll().then(result => res.json(result))
  );

  app.get("/comment/:id", (req, res) => db.comment.findByPk(req.params.id).then(result => res.json(result))
  );

  app.post("/comment", (req, res) => db.comment
    .create({
      title: req.body.title,
      content: req.body.content
    })
    .then(result => res.json(result))
  );

  app.put("/comment/:id", (req, res) => db.comment
    .update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(result => res.json(result))
  );

  app.delete("/comment/:id", (req, res) => db.comment
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
  );
};

