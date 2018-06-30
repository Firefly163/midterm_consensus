$(document).ready(function() {

  $(".title-field").focus().hover();

  $(".add-choice-button").on("click", function(event) {
    event.stopPropagation();
    if ($( "li" ).length <= 6) {
      $( "#ul_choices" ).append(`<li class="choice"><label for="choice">
        Choice : </label><input type="text" name="choice" class="create-form"> Description:
        <input type="text" name="desc" class="create-form" ></li>`);
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

