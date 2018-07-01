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
    window.location.href = "/register";
  });

  $("header .create-btn").on("click", function(event) {
    window.location.href = "/poll/create";
  });

  $("header .logout-btn").on("click", function(event) {
    window.location.href = "/logout";
  });

  $("header .myPolls-btn").on("click", function(event) {
    window.location.href = "/poll";
  });

  $("header .header-logo").on("click", function(event) {
    window.location.href = "/";
  });


});
