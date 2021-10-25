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
   // $(".quiz-questions").append(
     $(".quiz-questions-container").append(
      `<div class = "quiz-questions">
      <div class="form-group mb-2" id = "${questionNumber}-question-group">
        <label for="question${questionNumber}">Question ${questionNumber}:</label>
        <input id="questionTitle-${questionNumber}" class="form-control mb-2" type="text" name="question${questionNumber}" placeholder="eg. What is the capital of?" style= "width: 1000px;">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}1" value="1">
          <input id="questionChoice1-${questionNumber}" class="form-control" for="flexRadio${questionNumber}1" type="text" name="question${questionNumber}" placeholder="Choice 1"  style= "width: 500px;">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}2" value="2">
          <input id="questionChoice2-${questionNumber}" class="form-control" for="flexRadio${questionNumber}2" type="text" name="question${questionNumber}" placeholder="Choice 2"  style= "width: 500px;">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}3" value="3">
          <input id="questionChoice3-${questionNumber}" class="form-control" for="flexRadio${questionNumber}3" type="text" name="question${questionNumber}" placeholder="Choice 3" style= "width: 500px;">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${questionNumber}" id="flexRadio${questionNumber}4" value="4">
          <input id="questionChoice4-${questionNumber}" class="form-control" for="flexRadio${questionNumber}4" type="text" name="question${questionNumber}" placeholder="Choice 4" style= "width: 500px;">
        </div>
      </div>
      </div>
      `
    )
  });

// Submit questions

$("form").on('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById("quizTitle");
  if(!title.value.trim()) {
    alert("Please enter quiz title!");
    return;
  }

  //const visibility = getVisibility();

  getQuestions();
});

function getQuestions() {
  const elements = document.getElementsByClassName("quiz-questions");
  console.log(elements);
  console.log(elements.length);
  const questions = [];

  // HTMLCollection to get each element along with index

  const quizTitle = document.getElementById(`quizTitle`).value;
  //questions.push(quizTitle);

  //const isPrivate = (document.getElementById(`private-check`).checked)
  const isPrivate = getVisibility() === true ? "private" : "public";
  console.log("visibility",isPrivate);
  for(let index = 0; index < elements.length; index++) {

    const question_content = document.getElementById(`questionTitle-${index}`).value;
    const choice1 = document.getElementById(`questionChoice1-${index}`).value;
    const choice2 = document.getElementById(`questionChoice2-${index}`).value;
    const choice3 = document.getElementById(`questionChoice3-${index}`).value;
    const choice4 = document.getElementById(`questionChoice4-${index}`).value;

    // Defines the selected radio button
    const answerChoice = getRadioButtonValue(`radio${index}`);
     //console.log("++++",answerChoice)
    // Defines the answer
    const answer = document.getElementById(`questionChoice${answerChoice}-${index}`).value;

    questions.push({

      question_content,
      choice1,
      choice2,
      choice3,
      choice4,
      answer
    })
  }

console.log(questions);
  $.ajax({
    type: "POST",
    url: "/quizzes",
    data: {quizTitle,isPrivate, questions },
    success: () => {
      window.location.href = "/quizzes";
    },
    catch: (e) => {
      alert(e);
    }
  });
}

function getVisibility() {
  return document.getElementById("private-check").checked;
}


function getRadioButtonValue(selector) {

    const  ele = document.getElementsByName(selector);
       console.log("ele",ele)
    for(i = 0; i < ele.length; i++) {
      console.log("radio",ele[i])
        if(ele[i].checked) {

          return ele[i].value;
        }
    }
}


});
