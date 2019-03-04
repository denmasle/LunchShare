var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Lunch.findAll({}).then(function(dbLunches) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbLunches
      });
    });
  });

  app.get("/lunch/:id", function(req, res) {
    db.Lunch.findOne({ where: { id: req.params.id } }).then(function(dbLunches) {
      res.render("lunch", {
        example: dbLunches
      });
    });
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};