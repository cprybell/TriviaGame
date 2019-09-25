var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 20;
var timeLeft = 100;
var intervalId;
var answerStackCounter = 0;

function countDown() {
    timeLeft -= 1;
    $(".timer").text("Time Remaining: " + timeLeft);
    if(timeLeft == 0) {
        clearInterval(intervalId);
        gameOver();
    }
}

intervalId = setInterval(countDown, 1000);

function gameOver() {
    console.log('game Over');
}

function QuestionObject(question, answers, answer) {
    this.questionString = question;
    this.potentialAnswers = answers;
    this.correctAnswer = answer;
  }

  var questions = {
      questionOne : new QuestionObject("Who won the Ballon D'or (best male soccer player) in the year 2012", ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr'], "Lionel Messi"),
      questionTwo : new QuestionObject("Which team won the very first super bowl in 1967", ['Chiefs', 'Cowboys', 'Packers', 'Steelers'], "Packers"),
  }

  console.log(questions.questionOne);
  console.log(questions.length);

  function createQuestionHTML(objectQuestion) {
    var newQuestionDiv = $("<div>");
    var triviaDiv = $("<div>");
    triviaDiv.text(objectQuestion.questionString);
    newQuestionDiv.append(triviaDiv);
    var answersDiv = $("<div>");
    for (i = 0; i < objectQuestion.potentialAnswers.length; i++) {
        createCheckBox(answersDiv, i, objectQuestion.potentialAnswers[i]);
    }
    newQuestionDiv.append(answersDiv);
    $("#questionSpace").append(newQuestionDiv);
    answerStackCounter++;
  }

  function createCheckBox(divToAddTo, count, value) {
      var tempDiv = $("<div>");
      tempDiv.addClass("form-check form-check-inline");
      var tempInput = $("<input>");
      tempInput.addClass("form-check-input inlineRadioOptions" + answerStackCounter);
      tempInput.attr('type','radio');
      tempInput.attr('name','inlineRadioOptions' + answerStackCounter);
      tempInput.attr('id', "inlineRadio" + count);
      tempInput.attr('value', value);
      var tempLabel = $("<label>");
      tempLabel.addClass("form-check-label");
      tempLabel.attr('for', "inlineRadio" + count);
      tempLabel.text(value);
      tempDiv.append(tempInput);
      tempDiv.append(tempLabel);
      divToAddTo.append(tempDiv);
  }

  for (que in questions) {
      createQuestionHTML(questions[que]);
  }

  $(".form-check-input").on("click", recordLap);

  function recordLap(event) {
      console.log(this.value);
      $("." + this.name).attr('disabled', true);
  }
  