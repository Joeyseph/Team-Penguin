var str;
var terval;
var startTime;
function getTime(){
      var date = new Date();
      var hour = date.getHours()-startTime.getHours();
      if(hour<10){
            hour="0"+hour;
      }
      var minute = date.getMinutes()-startTime.getMinutes();
      if(minute<10){
            minute="0"+minute;
      }
      var second = date.getSeconds()-startTime.getSeconds();
      if(second<10){
            second="0"+second;
      }
      str = hour +":"+minute+":"+second;
}

function setTimer(){
      getTime();
      var mtimer = document.getElementById("sid");
      mtimer.innerHTML=str;
}

function startTimer(){
      startTime = new Date();
      terval = setInterval(setTimer,1000);
}

function stopTimer(){
      clearInterval(terval);
} 