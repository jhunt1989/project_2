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

  $("#create-jobsite").on("submit", function(event){
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
      function() {
        console.log("Created a new jobsite");
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
        location.reload();
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



});