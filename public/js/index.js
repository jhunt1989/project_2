$(function () {

  $("#create-project").on("submit", function (event) {
    event.preventDefault();
    console.log("i've been clicked");


    var newProject = {
      supervisor_id: parseInt($("#new-proj-supervisor").val()),
      jobsite_id: parseInt($("#new-proj-jobsite").val()),
      project_bid: parseInt($("#project-bid").val().trim())
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
      location.reload();
    })

    console.log(projectInfo)

  })






});