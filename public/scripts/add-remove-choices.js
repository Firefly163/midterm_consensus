$(document).ready(function() {

  $(".title-field").focus().hover();

  $(".add-choice-button").on("click", function(event) {
    event.stopPropagation();
    if ($( "li" ).length <= 6) {
      $( "#ul_choices" ).append("<li class='choice'><label for='choice'> Choice : </label><input type='text' name='choice'  class='create-form choice_id'> Description: <input type='text' name='desc' class='create-form' ></li>" );
     };
  })

  $(".remove-choice-button").on('click', function(event) {
    event.stopPropagation();
    $("li").last().remove();
  });

});

