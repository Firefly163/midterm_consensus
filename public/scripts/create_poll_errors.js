$(document).ready(function() {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    let $form = $(this);
    let $errors = $(".create-errors");
    $errors.empty();
    if (!$("#poll_title").val()) {
      $errors.append("<p>Title fields is empty</p>");
      return;
    };
    if (!$("#poll_description").val()) {
      $errors.append("<p>Description fields is empty</p>");
      return;
    };
    $('#ul_choices').children('.choice').each(function() {
      if(!$(this).find('.create-form').val() && !$errors.contents().length) {
        $errors.append("<p>Choice field is empty</p>");
        return;
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
