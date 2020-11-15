module.exports = (app, db) => {
  // eslint-disable-next-line prettier/prettier
  app.get( "/author/:id", (req, res) => db.author.findByPk(req.params.id).then( (result) => res.json(result))
  );
};
