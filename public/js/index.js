$(document).ready(function () {

  // hides all forms on page load
  $("#create-project").hide();
  $("#create-jobsite").hide();
  $("#create-supervisor").hide();
  $(".search-jobs-row").hide();
  $(".search-jobsite-row").hide();
  $(".search-supervisor-row").hide();


  //on click event for login button
  $("#loginBtn").on("click", function (event) {
    event.preventDefault();
    console.log("you have successfully logged in");
    window.location.replace("/view")

  })

  //from select view page, on click for manager button
  $("#managerBtn").on("click", function (event) {
    event.preventDefault();
    console.log("you are now in manager view");
    window.location.replace("/view/manager")

  })

  //from select view page, on click for foreman button
  $("#foremanBtn").on("click", function (event) {
    event.preventDefault();
    console.log("you are now in foreman view");
    window.location.replace("/view/foreman")

  })

  //from manager view, on click to add job form
  $("#createJob").on("click", function (event) {
    event.preventDefault();
    console.log("show form to create a new job");
    $("#create-project").show();
    $("#create-jobsite").hide();
    $("#create-supervisor").hide();
    $(".search-jobs-row").hide();
    $(".search-jobsite-row").hide();
    $(".search-supervisor-row").hide();



  })

  //from manager view, on click to add jobsite form
  $("#addJobsite").on("click", function (event) {
    event.preventDefault();
    console.log("show form to create a new job");

    $("#create-jobsite").show();
    $("#create-project").hide();
    $("#create-supervisor").hide();
    $(".search-jobs-row").hide();
    $(".search-jobsite-row").hide();
    $(".search-supervisor-row").hide();


  })

  //from manager view, on click to add jobsite form
  $("#addSuper").on("click", function (event) {
    event.preventDefault();
    console.log("show form to create a new job");

    $("#create-supervisor").show();
    $("#create-project").hide();
    $("#create-jobsite").hide();
    $(".search-jobs-row").hide();
    $(".search-jobsite-row").hide();
    $(".search-supervisor-row").hide();


  })


  $("#searchJobs").on("click", function (event) {
    event.preventDefault();
    console.log("show form to search through jobs");

    $("#create-project").hide();
    $("#create-jobsite").hide();
    $("#create-supervisor").hide();
    $(".search-jobs-row").show();
    $(".search-jobsite-row").hide();
    $(".search-supervisor-row").hide();


  })

  $("#searchSites").on("click", function (event) {
    event.preventDefault();
    console.log("show form to search through jobsites");

    $("#create-project").hide();
    $("#create-jobsite").hide();
    $("#create-supervisor").hide();
    $(".search-jobs-row").hide();
    $(".search-jobsite-row").show();
    $(".search-supervisor-row").hide();


  })

  $("#searchSuper").on("click", function (event) {
    event.preventDefault();
    console.log("show form to search through supervisors")

    $("#create-project").hide();
    $("#create-jobsite").hide();
    $("#create-supervisor").hide();
    $(".search-jobs-row").hide();
    $(".search-jobsite-row").hide();
    $(".search-supervisor-row").show();

  })

  //from manager view, on click view jobs button
  $("#viewJobs").on("click", function (event) {
    event.preventDefault();
    console.log("view list of all jobs");
    window.location.replace("/view/manager/table")

  })

  //from manager view, on click for view all jobsites
  $("#viewJobsites").on("click", function (event) {
    event.preventDefault();
    console.log("view list of all jobsites");
    window.location.replace("/view/manager/table/jobsites")

  })

  //from manager view, on click for view supervisors
  $("#viewSuper").on("click", function (event) {
    event.preventDefault();
    console.log("view list of supervisors");
    window.location.replace("/view/manager/table/supervisors")

  })


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

  ///////////////////////////////////////////////////////
  ////////////////// SEARCH INDIVIDUALS ////////////////

  $("#search-supervisor-form").on("submit", function (event) {
    event.preventDefault();
    console.log("You've searched for Supervisor ID: " + $("#supervisor-search").val());
    var superSearch = {
      id: parseInt($("#supervisor-search").val())
    }

    $.ajax("/api/supervisors/search/" + superSearch.id, {
      type: "GET"
    }).then(function (searchResult) {
      console.log(searchResult);
      $("#super-id").text(searchResult.id);
      $("#super-name").text(searchResult.supervisor_name);
      $("#super-expenses").text(searchResult.jobs_expenses);
      $("#super-revenue").text(searchResult.jobs_revenue);
      $("#super-profits").text(searchResult.jobs_profits);
    })

  })

  $("#search-jobsite-form").on("submit", function (event) {
    event.preventDefault();
    console.log("You've searched for Jobsite ID: " + $("#jobsite-search").val());

    var jobsiteSearch = {
      id: parseInt($("#jobsite-search").val())
    }

    $.ajax("/api/jobsites/search/" + jobsiteSearch.id, {
      type: "GET"
    }).then(function (searchResult) {
      console.log(searchResult);
      $("#jobsite-id").text(searchResult.id);
      $("#jobsite-title").text(searchResult.jobsite_name);
      $("#jobsite-expenses").text(searchResult.location_expenses);
      $("#jobsite-revenue").text(searchResult.location_revenue);
      $("#jobsite-profits").text(searchResult.location_profits);
    })

  })


  $("#search-jobs-form").on("submit", function (event) {
    event.preventDefault();
    console.log("You've searched for Job ID: " + $("#jobs-search").val());
    var jobsSearch = {
      id: parseInt($("#jobs-search").val())
    }

    $.ajax("/api/jobs/search/" + jobsSearch.id, {
      type: "GET"
    }).then(function (searchResult) {
      console.log(searchResult);
      $("#jobs-id").text(searchResult.id);
      $("#jobs-title").text(searchResult.project_name);
      $("#jobs-bid").text(searchResult.project_bid);
      $("#jobs-materialcosts").text(searchResult.materialcosts);
      $("#jobs-wagecosts").text(searchResult.wagecosts);
      $("#jobs-profit").text(searchResult.profit);
    })

  })







  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////










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

  getSupervisorData = function (jobID, supervisorID) {
    $.ajax("/api/jobs/" + jobID, {
      type: "GET"
    }).then(function (data) {

      $.ajax("/api/supervisors/" + supervisorID, {
        type: "GET"
      }).then(function (data2) {
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

  calculateSupervisorPerformance = function (localData, globalData) {
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
    }).then(function () {
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