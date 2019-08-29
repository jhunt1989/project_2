var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/jobs", function (req, res) {
    db.Job.findAll({}).then(function (dbJobs) {
      res.json(dbJobs);
    });
  });


  app.get("/api/jobsites", function (req, res) {
    db.Jobsite.findAll({}).then(function (dbJobsites) {
      res.json(dbJobsites);
    });
  });


  app.get("/api/supervisors", function (req, res) {
    db.Supervisor.findAll({}).then(function (dbSupervisors) {
      res.json(dbSupervisors);
    });
  });

  app.get("/view/manager/table", function (req, res) {
    db.Job.findAll({}
      ).then(function(data){
        // console.log(data[0].dataValues);
        var projectArray = [];
        for (i = 0; i < data.length; i++) {
          (projectArray).push(data[i].dataValues);
        }
        // console.log(dataArray)
        var hbsObject = {
          projects: projectArray
        };
        // console.log(hbsObject);
        res.render("tableView", hbsObject)
      })
  })


  app.post("/api/jobs", function (req, res) {

    db.Job.create(req.body).then(function (dbJobs) {
      res.json(dbJobs);
    });
  });

  app.post("/api/jobsites", function (req, res) {

    db.Jobsite.create(req.body).then(function (dbJobsites) {
      res.json(dbJobsites);
    });
  });

  app.post("/api/supervisors", function (req, res) {

    db.Supervisor.create(req.body).then(function (dbSupervisors) {
      res.json(dbSupervisors);
    });
  });

  app.put("/api/foreman", function (req, res) {

    db.Job.update(
      req.body,
      {
        where:
          { id: req.body.id }
      }).then(function (dbProjInfo) {
        res.json(dbProjInfo);
      });

  });

  //   // Create a new example
  //   app.post("/api/examples", function(req, res) {
  //     db.Example.create(req.body).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });

  //   // Delete an example by id
  //   app.delete("/api/examples/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });
};