$(document).ready(function() {

  $("#register-name").focus().select();

  $(".register-form").on("submit", function (event) {
    event.preventDefault();
    let $form = $(this);
    let $errors = $(".register-errors");
    $errors.empty();
    if ($("#register-name").val().trim() === "") {
      $errors.append("<p>Please enter an name!</p>");
    }
    if ($("#register-email").val().trim() === "") {
      $errors.append("<p>Please enter an email!</p>");
    }
    if ($("#register-password").val().trim() === "") {
      $errors.append("<p>Please enter an password!</p>");
    }
    if ($errors.contents().length === 0) {
      $.ajax({
        url:    '/register',
        method: 'POST',
        data:   $form.serialize()
      }).done(function(result) {
        if (result.error === "email") {
          $errors.append("<p>Email is Taken!</p>");
        } else {
          location.href = "/poll";
        }
      })
    }
  });

});
