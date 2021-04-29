const back = document.getElementById('back');
const five = document.getElementById('five');
const ten = document.getElementById('ten');
const fifteen = document.getElementById('fifteen');
var userID = getvalue("arg");

back.addEventListener('click', function(event) {
      window.history.back(-1);
    },true);

five.addEventListener('click', function(event) {
  window.location.href="questionMode.html?arg1=5&arg2="+userID;
},true);

ten.addEventListener('click', function(event) {
  window.location.href="questionMode.html?arg1=10&arg2="+userID;
},true);

fifteen.addEventListener('click', function(event) {
      window.location.href="questionMode.html?arg1=15&arg2="+userID;
    },true);

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