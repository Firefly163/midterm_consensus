$(document).ready(function() {
  $("header .login-btn").on("click", function (event) {
    // when button is pressed, login form sides up and down
    $(".login-form").slideToggle( "slow" );
  });
  $("header .register-btn").on("click", function(event) {
    window.location.href = "http://localhost:8080/register";
  })
});
