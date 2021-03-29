let score;
let left;
let time;
let questionAnswer;
let startTime;
let scoreDisplay;
let leftDisplay;
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
    remark.style.visibility = "hidden";
    goButton.style.visibility = "visible";
    feedbackDisplay.style.visibility = "hidden";

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

 
// set "score" and "left" display values
function setDisplay()
{
    scoreDisplay.innerHTML = "Score: "  + score;
    leftDisplay.innerHTML = "Questions left: " + left;
}


// check answer from user
function answer()
{   
    if (questionAnswer.answer == inputValue.value) {
        feedbackDisplay.innerHTML = "Correct! <br> Great job!";
        score += 1;
    }
    else {
        feedbackDisplay.innerHTML = "Sorry, the correct answer was " + questionAnswer.answer + ".";
    }

    left -= 1;

    inputValue.value = '';
    setDisplay();
    feedbackDisplay.style.visibility = "visible";
    questionDisplay.style.visibility = "hidden";   //hide other elements when feed back is showing
    answerInput.style.visibility = "hidden";
    goButton.style.visibility = "hidden";
    remark.style.visibility = "visible";
    if (left === 0) {
        endGame();
    }
     
}



// initialize everything
function beginGame()
{
    score = 0;
    left = 5;
    time = 0;

    scoreDisplay = document.getElementById("score");
    leftDisplay = document.getElementById("left");
    questionDisplay = document.getElementById("question");
    answerInput = document.getElementById("answer-block");
    inputValue = document.getElementById("answer");
    feedbackDisplay = document.getElementById("feedback");
    goButton = document.getElementById("go");
    remark = document.getElementById("remark");

    // TODO: set style in CSS?
    document.getElementById("begin").style.display = "none";
    scoreDisplay.style.visibility = "visible";
    leftDisplay.style.visibility = "visible";

    inputValue.value = '';

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
    feedbackDisplay.style.visibility = "hidden";
    remark.style.visibility = "hidden";

    document.getElementById("timer").innerHTML = "Time: " + hour +":"+minute+":"+second+"<br>" +"Score: "+ score;
    document.getElementById("timer").style.visibility = "visible";
}