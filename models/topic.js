module.exports = function(sequelize, DataTypes) {
  const Topic = sequelize.define("Topic", {
    // Giving the Author model a name of type STRING
    Topic: DataTypes.STRING,
    URL: DataTypes.STRING
  });

  return Topic;
};
