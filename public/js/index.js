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









});