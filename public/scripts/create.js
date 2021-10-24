// Client facing scripts here
$(() => {
  //Get the last question number from the id of the question group
  console.log('This is create.js');
  let lastId = $(".quiz-questions").children().last().attr("id");
  const lastIdNum = parseInt(lastId);
  let questionNumber = lastIdNum + 1;

  //Insert a new question with an id of +1 the last question number
  $( "#add-question-btn" ).on( "click", function() {
    let lastId = $(".quiz-questions").children().last().attr("id");
    const lastIdNum = parseInt(lastId);
    let questionNumber = lastIdNum + 1;
    $(".quiz-questions").append(
      `
      <div class="form-group mb-2" id = "${questionNumber}-question-group">
        <label for="question${questionNumber}">Question ${questionNumber}:</label>
        <input class="form-control mb-2" type="text" name="question${questionNumber}" placeholder="eg. What is the capital of?" style= "width: 1000px;">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}1">
          <input class="form-control" for="flexRadio${questionNumber}1" type="text" name="question${questionNumber}" placeholder="Choice 1" style= "width: 500px;">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}2">
          <input class="form-control" for="flexRadio${questionNumber}2" type="text" name="question${questionNumber}" placeholder="Choice 2" style= "width: 500px;">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}3">
          <input class="form-control" for="flexRadio${questionNumber}3" type="text" name="question${questionNumber}" placeholder="Choice 3" style= "width: 500px;">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}4">
          <input class="form-control" for="flexRadio${questionNumber}4" type="text" name="question${questionNumber}" placeholder="Choice 4" style= "width: 500px;">
        </div>
      </div>
      `
    )
  });
})
