var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 0;
var timeLeft = 10;
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
    console.log('You Got ' + correctAnswers + ' Correct!');
    console.log('You Got ' + incorrectAnswers + ' Incorrect!');
    console.log('You Got ' + Math.round((correctAnswers/totalQuestions) * 100) + '% of answered questions correct');
}

function QuestionObject(question, answers, answer) {
    this.questionString = question;
    this.potentialAnswers = answers;
    this.correctAnswer = answer;
  }

  var questions = {
      questionOne : new QuestionObject("Who won the Ballon D'or (best male soccer player) in the year 2012?", ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr'], "Lionel Messi"),
      questionTwo : new QuestionObject("Which team won the very first super bowl in 1967?", ['Chiefs', 'Cowboys', 'Packers', 'Steelers'], "Packers"),
      questionThree : new QuestionObject("Who won the Cy Young award in 2008?", ['Cliff Lee', 'Justin Verlander', 'C.C. Sabathia', 'Tim Lincecum'], "Cliff Lee"),
      questionFour : new QuestionObject("Who lead the NBA in scoring in 2013?", ['Lebron James', 'Kobe Bryant', 'Dwayne Wade', 'Kevin Durant'], "Kevin Durant"),
      questionFive : new QuestionObject("What team won the Stanley Cup in 2010?", ['Pittsburg Penguins', 'Detriot Redwings', 'Chicago Blackhawks', 'Boston Bruins'], "Chicago Blackhawks"),
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
        createCheckBox(answersDiv, i, objectQuestion.potentialAnswers[i], objectQuestion.correctAnswer);
    }
    newQuestionDiv.append(answersDiv);
    $("#questionSpace").append(newQuestionDiv);
    answerStackCounter++;
  }

  function createCheckBox(divToAddTo, count, value, answer) {
      var tempDiv = $("<div>");
      tempDiv.addClass("form-check form-check-inline");
      var tempInput = $("<input>");
      tempInput.addClass("form-check-input inlineRadioOptions" + answerStackCounter);
      tempInput.attr('type','radio');
      tempInput.attr('name','inlineRadioOptions' + answerStackCounter);
      tempInput.attr('id', value);
      tempInput.attr('value', answer);
      //tempInput.attr('answer', answer);
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

  $(".form-check-input").on("click", gradeAnswer);

  function gradeAnswer(event) {
      console.log(this.value);
      console.log(this.id);
      if (this.value === this.id) {
        correctAnswers++;
        totalQuestions++;
      }
      else {
          incorrectAnswers++;
          totalQuestions++;
      }
      console.log(correctAnswers);
      console.log(incorrectAnswers);
      console.log(totalQuestions);
      $("." + this.name).attr('disabled', true);
  }
  
