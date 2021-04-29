const back = document.getElementById('back');
const question = document.getElementById('question');
const student = document.getElementById('student');
 
back.addEventListener('click', function(event) {
      window.history.back(-1);
    },true);

question.addEventListener('click', function(event) {
  window.location.href="questionManage.html";
},true);

student.addEventListener('click', function(event) {
  window.location.href="studentManage.html";
},true);