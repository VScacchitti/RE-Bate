module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // eslint-disable-next-line prettier/prettier
      title: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Comment.associate = models => {
    Comment.belongsTo(models.author);
  };

  return Comment;
};
