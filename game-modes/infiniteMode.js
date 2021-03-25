let score;
let lives;
let time;
let questionAnswer;
let startTime;
let scoreDisplay;
let livesDisplay;
let questionDisplay;
let answerInput;
let feedbackDisplay;
let goButton;


// get add/subtract question
function add_sub()
{
    // temporary
    if (Math.random() < 0.5) {
        return { question: "15 + 12", answer: 27 };
    }
    else {
        return { question: "8 + 10", answer: 18 };
    }
}


// get places question
function places()
{
    // temporary
    if (Math.random() < 0.5) {
        return { question: "150 at the tens place", answer: 5 };
    }
    else {
        return { question: "211 at the hundreds place", answer: 2 };
    }
}


// get a random question, display it, and get an answer
function question()
{
    goButton.style.visibility = "visible";
    feedbackDisplay.style.visibility = "visible";

    // randomly choose type of question
    if (Math.random() < 0.5) {
        questionAnswer = add_sub();
        questionDisplay.innerHTML = questionAnswer.question + " = ";
    }
    else {
        questionAnswer = places();
        questionDisplay.innerHTML = questionAnswer.question + " is ";
    }

    questionDisplay.style.visibility = "visible";
    answerInput.style.visibility = "visible";
}


// set "score" and "lives" display values
function setDisplay()
{
    scoreDisplay.innerHTML = "Score: "  + score;
    livesDisplay.innerHTML = "Lives: " + lives;
}


// check answer from user
function answer()
{
    if (questionAnswer.answer == answerInput.value) {
        feedbackDisplay.innerHTML = "Correct!";
        score += 1;
    }
    else {
        feedbackDisplay.innerHTML = "Sorry, the correct answer was " + questionAnswer.answer + ".";
        lives -= 1;
    }

    answerInput.value = '';
    setDisplay();

    if (lives === 0) {
        endGame();
    }
    else {
        question();
    }
}


// initialize everything
function beginGame()
{
    score = 0;
    lives = 3;
    time = 0;

    scoreDisplay = document.getElementById("score");
    livesDisplay = document.getElementById("lives");
    questionDisplay = document.getElementById("question");
    answerInput = document.getElementById("answer");
    feedbackDisplay = document.getElementById("feedback");
    goButton = document.getElementById("go");

    // TODO: set style in CSS?
    document.getElementById("begin").style.display = "none";
    scoreDisplay.style.visibility = "visible";
    livesDisplay.style.visibility = "visible";

    answerInput.value = '';

    setDisplay();
    startTime = new Date();

    question();
}


// end the game and show results
function endGame()
{
    // get time
    let time = new Date();
    let diff = (time - startTime) / 1000;

    let hour = Math.trunc(diff / 3600);
    diff -= hour * 3600;

    let minute = Math.trunc(diff / 60);
    diff -= minute * 60;

    let second = Math.trunc(diff);

    if(hour < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }

    questionDisplay.style.visibility = "hidden";
    answerInput.style.visibility = "hidden";
    goButton.style.visibility = "hidden";
    document.getElementById("timer").innerHTML = "Time: " + hour +":"+minute+":"+second;
    document.getElementById("timer").style.visibility = "visible";
}
