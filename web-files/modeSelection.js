const back = document.getElementById('back');
const infinite = document.getElementById('infinite');
const question = document.getElementById('question');
var userID = getvalue("arg");
back.addEventListener('click', function(event) {
      window.history.back(-1);
    },true);

infinite.addEventListener('click', function(event) {
  window.location.href="infiniteMode.html?arg="+userID;
},true);

question.addEventListener('click', function(event) {
  window.location.href="questionModeSelection.html?arg="+userID;
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