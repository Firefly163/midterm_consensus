$(document).ready(function() {

  $(".create-button").on("click", function() {
    $.ajax({
      url: 'http://localhost:8080/poll/new',
      method: 'POST',
      data: $(".create-form").serialize(),
      success: function(response) {
        console.log("success!");
      }
   })
});

});








