$(document).ready(function() {
  if ($(".your-polls-article .container").children("a").length > 0) {
    $("#no-polls-message").css("display", "none");
  }
  if ($(".your-polls-article .container").children("a").length === 0) {
    $("#no-polls-message").css("display", "block");
  }

});
