const creatorEmail = "";

const mailOptions = {
  from: 'consensus.poll.app@gmail.com',
  to: creatorEmail,
  subject: "Someone took your poll!",
  html: "A user has taken your poll. Log in to <a href='http://localhost:8080/'>Consensus</a> to see the results!"
};


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

