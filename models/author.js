module.exports = function(sequelize, DataTypes) {
  const Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Author.associate = function(models) {
    // Associating Author with Comments
    // When an Author is deleted, also delete any associated Comments
    Author.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Author;
};
