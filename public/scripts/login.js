$(document).ready(function() {
  $(".login-form").on("submit", function (event) {
    event.preventDefault();
    let $form = $(this);
    let $errors = $(".errors");
    $errors.empty();
    if ($("#email").val().trim() === "") {
      $errors.append("<p>Please enter an email!</p>");
    }
    if ($("#password").val().trim() === "") {
      $errors.append("<p>Please enter an password!</p>");
    }
    if ($errors.contents().length === 0) {
      $.ajax({
        url: '/login',
        method: 'POST',
        data: $form.serialize()
      }).done(function(result) {
        if (result.error === "email") {
          $errors.append("<p>Email does not exist!</p>");
          console.log("Email does not exist!");
        } else if (result.error === "password") {
          $errors.append("<p>Password is incorrect!</p>");
          console.log("Password is incorrect");
        } else {
          console.log("good!");
          location.href = "/poll";
        }

      });
    }





  })

});
