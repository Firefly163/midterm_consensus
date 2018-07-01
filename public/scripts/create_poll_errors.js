$(document).ready(function() {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    let $form = $(this);
    let $errors = $(".create-errors");
    $errors.empty();
    if (!$("#poll_title").val()) {
      $errors.append("<p class='create-error'>Title field is empty</p>");
    };
    if (!$("#poll_description").val()) {
      $errors.append("<p class='create-error'>Description field is empty</p>");
    };
    $('#ul_choices').children('.choice').each(function() {
      if(!$(this).find('.choice-input').val() && !$errors.contents().length) {
        $errors.append("<p class='create-error'>Choice field is empty</p>");
      }
    });
    if(!$errors.contents().length) {
      $.ajax({
        url: '/poll/create',
        method: 'POST',
        data: $form.serialize(),
        success: (res) => {
            location.href = `/poll/${res.adminLink}`
          }
      })
    }
  })
})
