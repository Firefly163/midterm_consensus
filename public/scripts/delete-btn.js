$(document).ready(function() {

  $("#delete_poll").on("click", function(event) {
    event.preventDefault();
    const choice = confirm($(this).attr("data-confirm"));
    const pollId = $(this).data("poll-id");
    if (choice) {
      $.ajax({
        method: "POST",
        url:    `/poll/${pollId}/delete`,
        success: (res) => {
          location.href = "http://localhost:8080/poll";
        }
      })
    }
  });

});
