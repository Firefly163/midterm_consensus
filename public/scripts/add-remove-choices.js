$(document).ready(function() {

  $(".title-field").focus().hover();

  $(".add-choice-button").on("click", function(event) {
    event.stopPropagation();
    if ($( "li" ).length <= 6) {
      $( "#ul_choices" ).append(`
        <li class="choice">
          <input type="text" name="choice" class="choice-input" placeholder="CHOICE">
          <input type="text" name="desc" placeholder="CHOICE DESCRIPTION" value=" ">
        </li>`);
      $("li.choice").focus().select();
     }
  });

  $(".remove-choice-button").on("click", function(event) {
    event.stopPropagation();
    if($('#ul_choices').children('.choice').length > 2) {
      $("li").last().remove();
    }
  });

});

