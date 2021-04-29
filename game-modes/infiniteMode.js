// TODO: get questionNumber from the database
let questionNumber = 10;
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
let hasQuestion;
let oldQuestions;
let date;

// get the date
function getDate(){
	var year = new Date();
	year.getFullYear();
	
  var month = new Date();
	month.getMonth();
	
  var day = new Date();
	day.getDate();
	
  var date = year + "-" + month + "-" + day;
		return date
}

// save the score, total questions, and the date to the database
function addScore() {
var data = {
		"score" :score,
    "totalQuestions" :totalQuestions,
    "date":date,
};
var url = "user/scores"

$.ajax({
	 type:"POST",
        url:url,
        async:false,
        cache:false,
        data:data,
        dataType:"json",
        success: function(data, textStatus, JqXHR){
				},
        
			 error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: "+XMLHttpRequest.status);
            alert("textStatus: "+textStatus);
            alert("errorThrown: "+errorThrown);
        }
	});
}

// get a question from the database
function getQuestion()
{
    let dbquestion;
    let questionID = Math.trunc(Math.random * (questionNumber + 1));
    let url = "user/getQuestion";
    hasQuestion = false;

    let data = {
        "questionID": questionID,	 
    };

    $.ajax({
        type:"POST",
        url:url,
        async:false,
        cache:false,
        data:data,
        dataType:"json",
        success: function(data,textStaus,jqXHR){
            if( data.status == "success"){
                dbQuestion = { questionId: data.questionId, questionType: data.questionType, questionBody: data.questionBody, answer: data.answer, place: data.place };
                hasQuestion = true;
            }
        },

        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: "+XMLHttpRequest.status);
            alert("textStatus: "+textStatus);
            alert("errorThrown: "+errorThrown);
        }
    });

    return dbQuestion;
}


// get a random question, display it, and get an answer
function question()
{
    goButton.style.visibility = "visible";
    feedbackDisplay.style.visibility = "visible";

    // randomly choose type of question
    if (Math.random() < 0.5) {
        // add/subtract
        questionAnswer = getQuestion();

        // repeat until add/sub question is returned and it's a new question
        while (!hasQuestion || questionAnswer.questionType != "add.sub" || oldQuestions.includes(questionAnswer.questionId)) {
            questionAnswer = getQuestion();
        }

        questionDisplay.innerHTML = questionAnswer.questionBody + " = ";
    }
    else {
        // places
        questionAnswer = getQuestion();

        // repeat until places question is returned and it's a new question
        while (!hasQuestion || questionAnswer.questionType != "places" || oldQuestions.includes(questionAnswer.questionId)) {
            questionAnswer = getQuestion();
        }

        questionDisplay.innerHTML = questionAnswer.questionBody + " at the " + questionAnswer.place + " place is ";
    }

    // add question index to old questions
    oldQuestions.push(questionAnswer.questionId);

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
        totalQuestions +=1;
    }
    else {
        feedbackDisplay.innerHTML = "Sorry, the correct answer was " + questionAnswer.answer + ".";
        lives -= 1;
        totalQuestions +=1;
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
		totalQuestions = 0;
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
		date = getDate();
		addScore();
		
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
