$(document).ready(function() {

  $(".title-field").focus().hover();

  $(".add-choice-button").on("click", function(event) {
    event.stopPropagation();
    if ($( "li" ).length <= 6) {
      $( "#ul_choices" ).append(`
        <li class="choice">
          <input type="text" name="choice[]" placeholder="CHOICE">
          <input type="text" name="desc[]" placeholder="CHOICE DESCRIPTION" value=" ">
        </li>`);
      $("li.choice").focus().select();
     }
  });

  $(".remove-choice-button").on("click", function(event) {
    event.stopPropagation();
    $("li").last().remove();
  });

});

