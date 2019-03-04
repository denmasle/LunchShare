module.exports = function(sequelize, DataTypes) {
  var Lunch = sequelize.define("Lunch", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Lunch;
};