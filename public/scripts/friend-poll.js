$(document).ready(function() {

  let $dragged;
  let choicesMade     = 0;
  let numberOfChoices = $(".choice-container.full .choice").length;
  let poll_id         = $(".poll-title").attr("poll_id");

  $(".choice").on("dragstart", function (event) {
    $dragged = $(this);
  });

  $(".choice").on("dragend", function (event) {
    $dragged = null;
  });

  $(".choice-container").on("dragover", function (event) {
    event.preventDefault();
  });

  // making choices
  $(".choice-container.empty").on("drop", function (event) {
    choicesMade += 1;
    event.preventDefault();
    $(this).append($dragged);
    $dragged.attr("ranking", choicesMade);
  });

  // undoing choices
  $(".choice-container.full").on("drop", function (event) {
    choicesMade -= 1;
    event.preventDefault();
    $(this).append($dragged);
    let undoRank = Number($dragged.attr("ranking"));
    $dragged.attr("ranking", 0);
    $(this).siblings(".choice-container.empty").children(".choice").each(function () {
      let oldRank = Number($(this).attr("ranking"));
      if (oldRank > undoRank) {
        $(this).attr("ranking", oldRank-1);
      }
    });
  });

  $(".submit-ranks-btn").on("click", function (event) {
    $errors = $(".errors")
    $errors.empty();
    if (choicesMade != numberOfChoices) {
      $errors.append("<p>you need to rank ALL your choices!</p>");
    } else {
      let choicePointsObj = {};
      $(".choice-container.empty").children(".choice").each(function () {
        let id = $(this).attr("choice_id");
        let ranking = $(this).attr("ranking");
        let points = (numberOfChoices - (ranking - 1));
        choicePointsObj[id] = points;
      });
      $.ajax({
        url:    `/poll/${poll_id}/answers`,
        method: 'POST',
        data:   choicePointsObj,
        type:   "json"
      })
      $(".text-container").empty();
      $(".choices-container").empty();
      $(".btn-and-errors").empty();
      $(".thank-you").append(`
        <h1>Thanks for your input!</h1>
        <p>Login or Register to make your own polls!</p>
        `)
    }
  });

});







