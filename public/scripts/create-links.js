$(document).ready(function() {

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/poll/new',
      method: 'POST',
      data: $(this).serialize(),
      success: response => {
      $(this).trigger("reset")
      }
   })
});

});








