$(document).ready(function() {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    let $form = $(this);
    let $errors = $(".create-errors");
    $errors.empty();
    console.log($(".create-form-title").val());
    if ($(".create-form-title").val().trim() === "") {
      $errors.append("<p>Title or Description fields are empty</p>");
    }
    if ($(".create-form.choice_err").val().trim() === "") {
      $errors.append("<p>Choice field is empty</p>");
    }
    // if ($("#login-password").val().trim() === "") {
    //   $errors.append("<p>Please enter an password!</p>");
    // }
    // if ($errors.contents().length === 0) {
    //   $.ajax({
    //     url: '/login',
    //     method: 'POST',
    //     data: $form.serialize()
    //   }).done(function(result) {
    //     if (result.error === "email") {
    //       $errors.append("<p>Email does not exist!</p>");
    //     } else if (result.error === "password") {
    //       $errors.append("<p>Password is incorrect!</p>");
    //     } else {
    //       location.href = "/poll";
    //     }

    //   });
    // }
  })

});
