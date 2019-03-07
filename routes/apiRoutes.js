var db = require("../models");

module.exports = function (app) {
  //User's lunches
  app.user("/api/lunches", function (req, res) {
    db.Lunch.findAll({
      where: {
        eater: req.body.name
      },
    }).then(function (dbLunches) {
      res.json(dbLunches);
    }).catch(err => console.error(err));;
  });

  //Find lunches
  app.get("/api/lunches", function (req, res) {
    db.Lunch.findAll({
      where: {
        lunch: req.body.lunch
      },
    }).then(function (dbLunches) {
      res.json(dbLunches);
    }).catch(err => console.error(err));;
  });

  //new
  app.post("/api/lunches", function (req, res) {
    db.Lunch.create(req.body).then(function (dbLunches) {
      res.json(dbLunches);
    });
  });

  //put
  app.put("/api/lunches", function (req, res) {
    db.Lunch.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbLunches) {
        res.json(dbLunches);
      });
  });

  //delete
  app.delete("/api/lunches/:id", function (req, res) {
    db.Lunch.destroy({ where: { id: req.params.id } }).then(function (dbLunches) {
      res.json(dbLunches);
    });
  });
};