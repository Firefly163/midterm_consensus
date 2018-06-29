$(document).ready(function() {
  $(".add-choice-button").on("click", function(event) {
    event.stopPropagation();
    console.log("you clicked me!");

    $( "#ul_choices" ).append("<li class='choice'><label for='choice'> Choice : </label><input type='text' name='choice' class='create-form'> Description: <input type='text' name='desc' class='create-form' ></li>" );
  // event.stopPropagation();
  // console.log("you clicked me!")
  // const buttonArray = [".choice3", ".choice4", ".choice5", ".choice6"];
  // for (let i = 0; i < buttonArray.length; i ++) {
  //   console.log("inside the for loop")
  //   if ($(buttonArray[i]).css("display") === "none") {
  //     $(buttonArray[i]).css("display", "block");
  //     return
  //     // $(buttonArray[i]).show(1000)
  //   }
  // }
  })

});
