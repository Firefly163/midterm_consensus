const mailOptions = {
  from: 'consensus.poll.app@gmail.com',
  to: "mkhoury87@hotmail.com",
  subject: "Someone took your poll!",
  html: "A user has taken your poll. Log in to <a href='http://localhost:8080/'>Consensus</a> to see the results!"
};

$(document).ready(function() {

$("submit-ranks-btn").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/p/pollid',
      method: 'POST',
      data: $(this).serialize(),
      success: response => {
      $(this).trigger("reset");
      }
   })
});

}

module.exports = {
  gmailData: mailOptions
}

