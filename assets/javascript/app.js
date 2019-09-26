var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 0;
var timeLeft = 100;
var intervalId;
var answerStackCounter = 0;

function countDown() {
    timeLeft -= 1;
    $(".timer").text("Time Remaining: " + timeLeft);
    if(timeLeft == 0 || totalQuestions === answerStackCounter) {
        clearInterval(intervalId);
        gameOver();
    }
}

intervalId = setInterval(countDown, 1000);

function gameOver() {
    $("#correct").text('You Got ' + correctAnswers + ' Correct!');
    $("#incorrect").text('You Got ' + incorrectAnswers + ' Incorrect!');
    if (totalQuestions != 0) {
        $("#percentage").text('You Got ' + Math.round((correctAnswers/totalQuestions) * 100) + '% of answered questions correct');
    }
    else {
        $("#percentage").text('You did not answer any questions!');
    }
    $(".gameScore").fadeTo(1,1);
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
      questionSix : new QuestionObject("Who led the NFL in rushing in 1997?", ['Emmit Smith', 'Barry Sanders', 'Terelle Davis', 'The Rock'], "Barry Sanders"),
      questionSeven : new QuestionObject("Who led the MLB in homeruns in the year 2017?", ['Aaron Judge', 'Bryce Harper', 'Mike Trout', 'Giancarlo Stanton'], "Giancarlo Stanton"),
      questionEight : new QuestionObject("How many Preimer League Trophies have Liverpool FC won?", ['0', '2', '3', '6'], "0"),
      questionNine : new QuestionObject("Who won the world cup in 2010?", ['Spain', 'Germany', 'France', 'Netherlands'], "Spain"),
      questionTen : new QuestionObject("Who many championships did Michael Jordan win?", ['3', '4', '5', '6'], "6"),
      questionEleven : new QuestionObject("Who won the world cup in 2010?", ['Spain', 'Germany', 'France', 'Netherlands'], "Spain"),
      questionTwelve : new QuestionObject("Who won the AL MLB MVP award in 2005?", ['Albert Pujols', 'Alex Rodriguez', 'Derek Jeter', 'Barry Bonds'], "Alex Rodriguez"),
      questionThirteen : new QuestionObject("Who won the NFL MVP award in 2018?", ['Tom Brady', 'Russel Wilson', 'Patrick Mahomes', 'Carson Wentz'], "Patrick Mahomes"),
      questionFourteen : new QuestionObject("Who is the youngest MVP in NBA history?", ['Lebron James', 'Michael Jordan', 'Kobe Bryant', 'Derrick Rose'], "Derrick Rose"),
      questionFifteen : new QuestionObject("Who won the European Golden Boot in 2007?", ['Francesco Totti', 'Cristiano Ronaldo', 'Zinedine Zidane', 'Lionel Messi'], "Francesco Totti"),
    }

  function createQuestionHTML(objectQuestion) {
    var newQuestionDiv = $("<div>");
    newQuestionDiv.addClass("questionText");
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
      if (this.value === this.id) {
        correctAnswers++;
        totalQuestions++;
      }
      else {
          incorrectAnswers++;
          totalQuestions++;
      }

      $("." + this.name).attr('disabled', true);
  }
  
