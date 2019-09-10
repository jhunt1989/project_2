var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/jobs", function (req, res) {
    db.Job.findAll({}).then(function (dbJobs) {
      res.json(dbJobs);
    });
  });

  app.get("/api/jobs/:id", function (req, res) {
    db.Job.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbJobs) {
      res.json(dbJobs);
    });
  });

  app.get("/api/jobs/search/:id", function (req, res) {
    db.Job.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbJobs) {

      res.json(dbJobs)
    })
  })

  app.get("/api/jobsites/:id", function (req, res) {
    db.Jobsite.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbJobsite) {
      res.json(dbJobsite);
    })
  })

  app.get("/api/jobsites/search/:id", function (req, res) {
    db.Jobsite.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbJobsite) {

      res.json(dbJobsite)
    })
  })




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

  app.get("/api/supervisors/:id", function (req, res) {
    db.Supervisor.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbSupervisor) {
      res.json(dbSupervisor)
    })
  })

  app.get("/api/supervisors/search/:id", function (req, res) {
    db.Supervisor.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbSupervisor) {

      res.json(dbSupervisor)
    })
  })



  app.get("/view/manager/table", function (req, res) {
    db.Job.findAll({}).then(function (data) {
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
      res.render("tableView", hbsObject);
    })
  })

  app.get("/view/manager/table/jobsites", function (req, res) {
    db.Jobsite.findAll({}).then(function (data) {
      var jobsiteArray = [];
      for (i = 0; i < data.length; i++) {
        (jobsiteArray).push(data[i].dataValues);
      }

      var hbsObject = {
        jobsites: jobsiteArray
      };
      res.render("jobsiteTableView", hbsObject);
    })
  })

  app.get("/view/manager/table/supervisors", function (req, res) {
    db.Supervisor.findAll({}).then(function (data) {
      var supervisorArray = [];
      for (i = 0; i < data.length; i++) {
        (supervisorArray).push(data[i].dataValues);
      }

      var hbsObject = {
        supervisors: supervisorArray
      };
      res.render("supervisorTableView", hbsObject);
    })
  })


  app.get("/view/manager/table/customers", function (req, res) {
    db.Customer.findAll({}).then(function (data) {
      var customerArray = [];
      for (i = 0; i < data.length; i++) {
        (customerArray).push(data[i].dataValues);
      }

      var hbsObject = {
        customers: customerArray
      };
      res.render("customerTableView", hbsObject);
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

  app.post("/api/customers", function (req, res) {  
    db.Customer.create(req.body).then(function (dbCustomers) {
      res.json(dbCustomers);
    });
  });


  app.get("/api/customers/lookup/:id", function (req, res) {
    db.Customer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbCustomer) {

      res.json(dbCustomer)
    })
  })


  app.post("/api/customers/delete/:id", function (req, res){
    db.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(rowDeleted){
      res.json(rowDeleted);
    })
  })

  app.put("/api/foreman", function (req, res) {

    db.Job.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbProjInfo) {
      res.json(dbProjInfo);
    });

  });

  app.put("/api/jobsites", function (req, res) {

    db.Jobsite.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbJobsiteInfo) {
      res.json(dbJobsiteInfo)
    })
  })

  app.put("/api/supervisors", function (req, res) {

    db.Supervisor.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbSupervisorInfo) {
      res.json(dbSupervisorInfo)
    })
  })

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