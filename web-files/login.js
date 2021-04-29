const student = document.getElementById('student');
const teacher = document.getElementById('teacher');
var password = document.getElementById('password');
const close1 = document.getElementById('close1');
const close2 = document.getElementById('close2');
const close3 = document.getElementById('close3');
const modal = document.getElementById('modal');
const student_interface = document.getElementById('student_interface');
const submit = document.getElementById('submit');
const submit2 = document.getElementById('submit2');
var canShow = true;
var firstname;
var lastName;
var userID;
var classID;

// Show modal
document.body.addEventListener("click", function(event) {
  
  event.preventDefault();
  if(canShow == true){
  modal.classList.add('show-modal');
  canShow = false;
  }
} ,false);

// Hide modal
close1.addEventListener('click', function(event) {
   event.stopPropagation();
   modal.classList.remove('show-modal');
   canShow = true;
});

//show student log in interface

student.addEventListener("click", function(event) {
  
  event.preventDefault();
  event.stopPropagation();
  modal.classList.remove('show-modal');
  student_interface.classList.add('show-table');
} ,true);

 

close2.addEventListener('click', function(){
  student_interface.classList.remove('show-table');
  canShow = true;
});

//show teacher log in interface

teacher.addEventListener("click", function(event) {
  
  event.preventDefault();
  event.stopPropagation();
  modal.classList.remove('show-modal');
  teacher_interface.classList.add('show-table');
} ,true);

 

close3.addEventListener('click', function(){
  teacher_interface.classList.remove('show-table');
  canShow = true;
});

//go to game selection interface

submit.addEventListener('click', function(event) {
  insert_1();
  window.location.href="modeSelection.html?arg="+userID;
},true);

//check if the password is correct, if it is go to managemanet interface
submit2.addEventListener('click',function(){
  var input = password.value;
  if(input === "penguin"){
    window.location.href="teacherSelection.html";
  }else{
    alert("password wrong, please enter again");
  }
});

//insert new student into database
function insert_1(){
	firstName = document.getElementById('first-name').value;
	lastName = document.getElementById('last-name').value;
  classID = document.getElementById('classID').value;
 	var data = {
    		"firstName":firstName,
   			"lastName":lastName,
         "classID":classID
  			};
    var url = "user/add";
  $.ajax({
   			type:"POST",
   			url:url,
    		async:false,
    	  	cache:false,
    	  	//data: JSON.stringify(data),
    	  	data:data,
    	  	dataType:"json",
    	  	success: function(data,textStaus,jqXHR){
    	  	//data = eval("("+data+")");
    	  	if( data.status == "success"){
    	  				userFirstName = data.firstName;
    	  				userLastName = data.lastName;
                userID = data.ID;
		        		alert("Welcome, "+ data.firstName);
		        	}else if(data.status == "existed"){
		        		userFirstName = data.firstName;
    	  				userLastName = data.lastName;
                userID = data.ID;
                //alert(userID);
                alert("Long time no see, "+ data.firstName);
		        	}
		        },
		       
            error:function (XMLHttpRequest, textStatus, errorThrown) {      
             
          alert("XMLHttpRequest: "+XMLHttpRequest.status);
					alert("textStatus: "+textStatus);
					alert("errorThrown: "+errorThrown);
		            
          }
           
         
      });
   }



  