


$(document).ready(function() {

$("submit-ranks-btn").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/p/:poll_id',
      method: 'POST',
      data: $(this).serialize(),
      success: response => {
      console.log("Email sent to", response);
      }
   })
});

});

module.exports = {
  gmailData: mailOptions,
}

