var db = require("../models");

var path = require("path");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Job.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });


  app.get("/view", function (req, res) {
    res.render("selectView");
  });

  app.get("/view/manager", function (req, res) {
    res.render("managerView")
  });

  app.get("/view/foreman", function (req, res) {
    res.render("foremanView")
  });

  app.get("/view/manager/table", function (req, res) {
    res.render("tableView")
  });


  // // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};
