var db = require("../models");

module.exports = function(app) {
  //all
  app.get("/api/lunches", function(req, res) {
    db.Lunch.findAll({}).then(function(dbLunches) {
      res.json(dbLunches);
    });
  });

  //new
  app.post("/api/lunches", function(req, res) {
    db.Lunch.create(req.body).then(function(dbLunches) {
      res.json(dbLunches);
    });
  });

  //put
  app.put("/api/lunches", function(req, res) {
    db.Lunch.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbLunches) {
        res.json(dbLunches);
      });
  });

  //delete
  app.delete("/api/lunches/:id", function(req, res) {
    db.Lunch.destroy({ where: { id: req.params.id } }).then(function(dbLunches) {
      res.json(dbLunches);
    });
  });
};