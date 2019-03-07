module.exports = function (sequelize, DataTypes) {
    var Lunch = sequelize.define("Lunch", {
        eater: DataTypes.STRING,
        lunch: DataTypes.STRING,
        tradable: DataTypes.BOOLEAN,
    });
    return Lunch;
};