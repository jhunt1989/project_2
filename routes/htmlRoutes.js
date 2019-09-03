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
    var supervisorArray = [];
    var jobsiteArray = [];
    var jobsArray = [];
    var managerObject = {
      supervisors: supervisorArray,
      jobsites: jobsiteArray,
      jobs: jobsArray
    }

    db.Supervisor.findAll({}
    ).then(function (data) {
      for (i = 0; i < data.length; i++) {
        (supervisorArray).push(data[i].dataValues);
      }
      db.Jobsite.findAll({}
      ).then(function (data2) {
        for (j = 0; j < data2.length; j++) {
          (jobsiteArray).push(data2[j].dataValues);
        }
        db.Job.findAll({}
        ).then(function(data3) {
          for (k = 0; k < data3.length; k++) {
            (jobsArray).push(data3[k].dataValues);
          }
        })
        res.render("managerView", managerObject)
      })
    })




    setTimeout(function () {
      console.log("data loaded!")
    }, 2000)

    // db.Jobsite.findall({})


  });

  app.get("/view/foreman", function (req, res) {
    db.Job.findAll({}
    ).then(function (data) {
      // console.log(data[0].dataValues);
      var projectArray = [];
      for (i = 0; i < data.length; i++) {
        (projectArray).push(data[i].dataValues);
      }
      // console.log(dataArray)
      var hbsObject = {
        projects: projectArray
      };

      res.render("foremanView", hbsObject)
    });
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
