$(document).ready(function() {

$("add-choice-button").on("click", function() {
  const buttonArray = [".choice3", ".choice4", ".choice5", ".choice6"];
  for (let i = 0; i < buttonArray.length; i ++) {
    if (buttonArray[i].css(display) === "none") {
      buttonArray[i + 1].css(display, "block");
    }
  }
})

});
