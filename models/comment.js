module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Comment.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
