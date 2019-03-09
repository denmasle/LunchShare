var express = require("express");
var app = express.Router();
var db = require("../models");

  //User's lunches
  app.get("/user/:id", function (req, res) {
    db.Lunch.findAll({
      where: {
        userID: req.params.id
      },
    }).then(function (dbLunches) {
      res.json(dbLunches);
    }).catch(err => console.error(err));
  });

  //User's lunches
  app.post("/user", function (req, res) {
    db.Lunch.create(req.body)
    .then(function (dbLunches) {
      res.json(dbLunches);
    }).catch(err => console.error(err));
  });


//  = function (app) {
//   //User's lunches
//   app.get("/user", function (req, res) {
//     db.Lunch.findAll({
//       where: {
//         eater: req.body.name
//       },
//     }).then(function (dbLunches) {
//       res.json(dbLunches);
//     }).catch(err => console.error(err));;
//   });

//   //Find lunches
//   app.get("/lunches", function (req, res) {
//     db.Lunch.findAll({
//       where: {
//         lunch: req.body.lunch
//       },
//     }).then(function (dbLunches) {
//       res.json(dbLunches);
//     }).catch(err => console.error(err));;
//   });

//   //new
//   app.post("/api/lunches", function (req, res) {
//     db.Lunch.create(req.body).then(function (dbLunches) {
//       res.json(dbLunches);
//     });
//   });

//   //put
//   app.put("/api/lunches", function (req, res) {
//     db.Lunch.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then(function (dbLunches) {
//         res.json(dbLunches);
//       });
//   });

//   //delete
//   app.delete("/api/lunches/:id", function (req, res) {
//     db.Lunch.destroy({ where: { id: req.params.id } }).then(function (dbLunches) {
//       res.json(dbLunches);
//     });
//   });
// };

module.exports = app;