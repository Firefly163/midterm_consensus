$(document).ready(function() {
  $("header .login-btn").on("click", function (event) {
    // when button is pressed, login form sides up and down
    $(".login-form").slideToggle("slow");
    $("#login-email").focus().select();
  });
  $("#login-on-register-pg").on("click", function (event) {
    event.preventDefault();
    $(".login-form").slideToggle("slow");
  });
  $("header .register-btn").on("click", function(event) {
    window.location.href = "http://localhost:8080/register";
  });
  $("header .create-btn").on("click", function(event) {
    window.location.href = "http://localhost:8080/poll/create";
  });
  $("header .logout-btn").on("click", function(event) {
    window.location.href = "http://localhost:8080/logout";
  });
  $("header .myPolls-btn").on("click", function(event) {
    window.location.href = "http://localhost:8080/poll";
  });
});
