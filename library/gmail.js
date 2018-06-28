const creatorEmail = "";

const mailOptions = {
  from: 'consensus.poll.app@gmail.com',
  to: creatorEmail,
  subject: "Someone took your poll!",
  html: "A user has taken your poll. Log in to <a href='http://localhost:8080/'>Consensus</a> to see the results!"
};

function getCreator async (pollId) {
  return knex.first("user_id")
  .from("polls")
  .where("poll_id", "=", pollId)
    await (result => result.user_id);
    console.log("user id", result.user_id)
    getCreatorEmail async (result.user_id) {
      return knex.first("email")
      .from("users")
      .where("user_id", "=", result.user_id)
      await (result => result.email);
      console.log("email", result.email)
    }
};

$(document).ready(function() {

$("submit-ranks-btn").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/p/:poll_id',
      method: 'POST',
      data: $(this).serialize(),
      success: response => {
      console.log("Email sent to", creatorEmail);
      }
   })
});

}

module.exports = {
  gmailData: mailOptions,
}

