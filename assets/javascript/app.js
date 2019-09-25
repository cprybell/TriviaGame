var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 20;
var timeLeft = 100;
var intervalId;

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

