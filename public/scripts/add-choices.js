$(document).ready(function() {
  $(".add-choice-button").on("click", function(event) {
    event.stopPropagation();
    if ($( "li" ).length <= 6) {
      $( "#ul_choices" ).append("<li class='choice'><label for='choice'> Choice : </label><input type='text' name='choice' class='create-form'> Description: <input type='text' name='desc' class='create-form' ></li>" );
     };
  })

});
