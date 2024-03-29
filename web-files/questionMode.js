let score;
let left;
let time;
let totalQuestions;
let questionAnswer;
let startTime;
let scoreDisplay;
let leftDisplay;
let questionDisplay;
let answerInput;
let feedbackDisplay;
let goButton;
let hasQuestion;
let oldQuestions =[];
let backButton;
 
var userID = getvalue("arg2");
 

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

// save the score, total questions, and the date to the database
function addScore() {
    var data = {
        "ID":userID,
        "score":score,
        "correctRate":parseFloat(score/totalQuestions).toFixed(2),
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
                if( data.status == "success"){
                    alert("You are doing great!");
                }
                    },
    
                 error:function (XMLHttpRequest, textStatus, errorThrown) {
                alert("XMLHttpRequest: "+XMLHttpRequest.status);
                alert("textStatus: "+textStatus);
                alert("errorThrown: "+errorThrown);
            }
        });
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
    totalQuestions += 1;
    //alert (questionAnswer.questionBody);
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
    if (Math.trunc(questionAnswer.answer) == Math.trunc(inputValue.value)) {
        feedbackDisplay.innerHTML = "Correct! <br> Great job!";
        score += 1;
    }
    else {
        feedbackDisplay.innerHTML = "Sorry, the correct answer was " + Math.trunc(questionAnswer.answer) + ".";
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
    left = getvalue("arg1");
    time = 0;
    totalQuestions = 0;
    scoreDisplay = document.getElementById("score");
    leftDisplay = document.getElementById("left");
    questionDisplay = document.getElementById("question");
    answerInput = document.getElementById("answer-block");
    inputValue = document.getElementById("answer");
    feedbackDisplay = document.getElementById("feedback");
    goButton = document.getElementById("go");
    remark = document.getElementById("remark");
    backButton = document.getElementById("back");
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
    backButton.style.visibility = "visible";
   
	addScore();
}

function back() {
    window.history.back(-1);
  }

//get argument from questionModeSelection.html
function getvalue(name)
{
var str=window.location.search;
if (str.indexOf(name)!=-1)
{
var pos_start=str.indexOf(name)+name.length+1;
var pos_end=str.indexOf("&",pos_start);
if (pos_end==-1)
{
return str.substring(pos_start);
}
else
{
return str.substring(pos_start,pos_end)
}
}
else
{
return "error";
}
}

 
 