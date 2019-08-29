$(function () {

  $("#create-project").on("submit", function (event) {
    event.preventDefault();
    console.log("i've been clicked");

    var newProject = {
      supervisor_id: parseInt($("#new-proj-supervisor").val()),
      jobsite_id: parseInt($("#new-proj-jobsite").val()),
      project_bid: parseInt($("#project-bid").val().trim()),
      project_name: $("#project-name").val().trim()
    };

    $.ajax("/api/jobs", {
      type: "POST",
      data: newProject
    }).then(
      function () {
        console.log("Created a new project");
        location.reload();
      }
    )

    console.log(newProject);

  });

  $("#create-jobsite").on("submit", function (event) {
    event.preventDefault();
    console.log("i've been clicked");

    var newJobsite = {
      jobsite_name: $("#jobsite-name").val().trim(),
      address: $("#jobsite-address").val().trim(),
      primary_contact: $("#jobsite-primarycontact").val().trim(),
      phone_number: $("#jobsite-phone").val().trim(),
      email: $("#jobsite-email").val().trim()
    };

    $.ajax("/api/jobsites/", {
      type: "POST",
      data: newJobsite
    }).then(
      function () {
        console.log("Created a new jobsite");
        location.reload();
      }
    )
  })

  $("#create-supervisor").on("submit", function (event) {
    event.preventDefault();
    console.log("i've been clicked");

    var newSupervisor = {
      supervisor_name: $("#supervisor-name").val().trim(),
      specialties: $("#supervisor-specialties").val()
    };

    $.ajax("/api/supervisors/", {
      type: "POST",
      data: newSupervisor
    }).then(
      function () {
        console.log("Created a new supervisor");
        location.reload();
      }
    )
  })


  $("#project-info").on("submit", function (event) {
    event.preventDefault();
    console.log("I've been clicked");

    var projectInfo = {
      id: parseInt($("#project-id").val()),
      hours: parseInt($("#project-hours").val()),
      workers: parseInt($("#project-workers").val()),
      materialcosts: parseInt($("#project-materialcosts").val()),
      jobcomments: $("#project-jobcomments").val()
    }

    $.ajax("/api/foreman", {
      type: "PUT",
      data: projectInfo
    }).then(function () {
      alert("You input your job data!");
      calculateData();
    })

    //////////// Calculate Wages and Profits ////////////
    calculateData = function () {
      $.ajax("/api/jobs/" + projectInfo.id, {
        type: "GET"
      }).then(function (data) {
        // console.log(data);
        // console.log("current sales: " + data.sales);
        calculateWages(data);
      })
    }

    calculateWages = function (data) {
      console.log("Calculate wages will be using this data: " + JSON.stringify(data))
      var wages = data.hours * data.workers;
      console.log(wages)
      var wageObject = {
        id: data.id,
        wagecosts: wages
      }

      $.ajax("/api/foreman", {
        type: "PUT",
        data: wageObject
      }).then(function () {
        console.log("We've calculate wages and input that information for you into your table!");
        calculateProfit(data, wages);
      })

    }

    calculateProfit = function (data, wages) {
      console.log("Calculating Profits using this data: " + JSON.stringify(data))
      var revenue = data.project_bid;
      var expenses = wages + data.materialcosts;

      console.log("Project Revenues: " + revenue);
      console.log("Project Expenses: " + expenses);
      var profit = revenue - expenses;
      console.log("Project Profit: " + profit);

      var profitObject = {
        id: data.id,
        profit: profit
      }

      $.ajax("/api/foreman", {
        type: "PUT",
        data: profitObject
      }).then(function () {
        console.log("We've calculated the profit received on this project")
        getJobsiteData(data.id, data.jobsite_id);
        getSupervisorData(data.id, data.supervisor_id);
      })

    }

  })
  // function calculateNewSales(currentSales) {
  //   var newSales = currentSales + itemPrice;

  //   var productSales = {
  //     sales: newSales
  //   }

  //   $.ajax("/api/menu/order/" + itemData, {
  //     type: "PUT",
  //     data: productSales
  //   }).then(
  //     function () {
  //       console.log("Successfully updates sales");
  //       // location.reload();
  //     }
  //   )
  // }
  /////////////////////////////////////////////////////

  //////////// Calculate Wages and Profits ////////////
  getJobsiteData = function (jobID, jobsiteID) {
    // var data1B;
    // var data2B;
    $.ajax("/api/jobs/" + jobID, {
      type: "GET"
    }).then(function (data) {
      // console.log(data);
      // console.log("current sales: " + data.sales);
      $.ajax("/api/jobsites/" + jobsiteID, {
        type: "GET"
      }).then(function (data2) {

        calculateJobsitePerformance(data, data2);
      })


    })
  }

  getSupervisorData = function(jobID, supervisorID) {
    $.ajax("/api/jobs/" + jobID, {
      type: "GET"
    }).then(function(data){

      $.ajax("/api/supervisors/" + supervisorID, {
        type: "GET"
      }).then(function(data2){
        calculateSupervisorPerformance(data, data2)
      })
    })
  }

  calculateJobsitePerformance = function (localData, globalData) {
    console.log("Local Data: " + JSON.stringify(localData));
    console.log("Global Data:" + JSON.stringify(globalData));

    var localRevenue = localData.project_bid;
    var localExpenses = localData.materialcosts + localData.wagecosts;
    var localProfits = localData.profit;

    var globalRevenue = globalData.location_revenue;
    var globalExpenses = globalData.location_expenses;
    var globalProfits = globalData.location_profits;

    var newRevenue = localRevenue + globalRevenue;
    var newExpenses = localExpenses + globalExpenses;
    var newProfits = localProfits + globalProfits;

    var jobsiteFinancialsObj = {
      id: globalData.id,
      location_expenses: newExpenses,
      location_revenue: newRevenue,
      location_profits: newProfits
    }

    $.ajax("/api/jobsites/", {
      type: "PUT",
      data: jobsiteFinancialsObj
    }).then(function () {
      console.log("Jobsite Table has been updated!");
      // location.reload();
    })

  }

  calculateSupervisorPerformance = function(localData, globalData) {
    console.log("Local Supervisor Data: " + JSON.stringify(localData));
    console.log("Global Supervisor Data: " + JSON.stringify(globalData));

    var localRevenue = localData.project_bid;
    var localExpenses = localData.materialcosts + localData.wagecosts;
    var localProfits = localData.profit;

    var globalRevenue = globalData.jobs_revenue;
    var globalExpenses = globalData.jobs_expenses;
    var globalProfits = globalData.jobs_profits;

    var newRevenue = localRevenue + globalRevenue;
    var newExpenses = localExpenses + globalExpenses;
    var newProfits = localProfits + globalProfits;

    var supervisorFinancialsObj = {
      id: globalData.id,
      jobs_expenses: newExpenses,
      jobs_revenue: newRevenue,
      jobs_profits: newProfits
    }

    $.ajax("/api/supervisors/", {
      type: "PUT",
      data: supervisorFinancialsObj
    }).then(function (){
      console.log("Supervisor Table has been updated!")
    })
  }


  // app.get("/view/manager", function (req, res) {
  //   var supervisorArray = [];
  //   var jobsiteArray = [];
  //   var managerObject = {
  //     supervisors: supervisorArray,
  //     jobsites: jobsiteArray
  //   }

  //   db.Supervisor.findAll({}
  //   ).then(function (data) {
  //     for (i = 0; i < data.length; i++) {
  //       (supervisorArray).push(data[i].dataValues);
  //     }
  //     db.Jobsite.findAll({}
  //     ).then(function (data2) {
  //       for (j = 0; j < data2.length; j++) {
  //         (jobsiteArray).push(data2[j].dataValues);
  //       }
  //       res.render("managerView", managerObject)
  //     })
  //   })

  // calculateWages = function (data) {
  //   console.log("Calculate wages will be using this data: " + JSON.stringify(data))
  //   var wages = data.hours * data.workers;
  //   console.log(wages)
  //   var wageObject = {
  //     id: data.id,
  //     wagecosts: wages
  //   }

  //   $.ajax("/api/foreman", {
  //     type: "PUT",
  //     data: wageObject
  //   }).then(function () {
  //     console.log("We've calculate wages and input that information for you into your table!");
  //     calculateProfit(data, wages);
  //   })

  // }

  calculateProfit = function (data, wages) {
    console.log("Calculating Profits using this data: " + JSON.stringify(data))


  };



});