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
let oldQuestions =[];
let backButton;
 


// get a question from the database
function getQuestion()
{
    let dbQuestion;
    let questionID = Math.trunc(Math.random()* (20 + 1));
    hasQuestion = false;

    var data = {
        "questionID": questionID,	 
    };
    let url = "user/getQuestion";
    $.ajax({
        type:"POST",
        url:url,
        async:false,
        cache:false,
        data:data,
        dataType:"json",
        success: function(data,textStaus,jqXHR){
            if( data.status == "success"){
                dbQuestion = {questionType : data.type, questionBody : data.questionBody, 
                    answer : data.answer, place : data.place , number:data.number, questionID:questionID}; 
                    hasQuestion = true;
            }
        },

        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: "+XMLHttpRequest.status);
            alert("textStatus: "+textStatus);
            alert("errorThrown: "+errorThrown);
        }
         
    });
    //alert (dbQuestion.questionBody);
    return dbQuestion;
}

 

// get a random question, display it, and get an answer
function question()
{
    remark.style.visibility = "hidden";
    goButton.style.visibility = "visible";
    feedbackDisplay.style.visibility = "hidden";
    
    // get a question
    questionAnswer = getQuestion();

    // repeat until add/sub question is returned and it's a new question
    while (!hasQuestion || oldQuestions.includes(questionAnswer.questionID)) {
        questionAnswer = getQuestion();
    }

    if (questionAnswer.questionType == "add.sub") {
        questionDisplay.innerHTML = questionAnswer.questionBody + " = ";
    }
    else {
        questionDisplay.innerHTML = Math.trunc(questionAnswer.number) + " at the " + questionAnswer.place + " place is ";
    }

    // add question index to old questions
    oldQuestions.push(questionAnswer.questionID);
     
    //alert (questionAnswer.questionBody);
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
    if (Math.trunc(questionAnswer.answer) == Math.trunc(inputValue.value)) {
        feedbackDisplay.innerHTML = "Correct! <br> Great job!";
        score += 1;
    }
    else {
        feedbackDisplay.innerHTML = "Sorry, the correct answer was " + Math.trunc(questionAnswer.answer) + ".";
        lives -= 1;
    }

     

    inputValue.value = '';
    setDisplay();
    feedbackDisplay.style.visibility = "visible";
    questionDisplay.style.visibility = "hidden";   //hide other elements when feed back is showing
    answerInput.style.visibility = "hidden";
    goButton.style.visibility = "hidden";
    remark.style.visibility = "visible";
    if (lives === 0) {
        endGame();
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
    answerInput = document.getElementById("answer-block");
    inputValue = document.getElementById("answer");
    feedbackDisplay = document.getElementById("feedback");
    goButton = document.getElementById("go");
    remark = document.getElementById("remark");
    backButton = document.getElementById("back");
     
    document.getElementById("begin").style.display = "none";
    scoreDisplay.style.visibility = "visible";
    livesDisplay.style.visibility = "visible";

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
    backButton.style.visibility = "visible";
}

 function back() {
    window.history.back(-1);
  }