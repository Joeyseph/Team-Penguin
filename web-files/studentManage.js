 

function getStudents(){
      var studentList = document.getElementById("studentList");
      var contend;
      if(document.getElementById('classID').value.length==6){
      contend = getter();
      contend = contend.replace(",", "\n");
      contend=contend.replace("{", " ");
      contend=contend.replace("}", " ");
      studentList.innerHTML=contend;
}else if(document.getElementById('classID').value.length==8){
      contend = getGrade();
      alert(contend);
      studentList.innerHTML=contend;
}
       
}


function getter(){
      let result;
	var classID = document.getElementById('classID').value;
       
      data = {
            classID: classID,
            }
      
 
    var url = "user/students";
  $.ajax({
   		type:"POST",
   		url:url,
    		async:false,
    	  	cache:false,
     	  	data:data,
    	  	dataType:"json",
    	  	success: function(data,textStaus,jqXHR){
                        result=data;
		        },
		       
            error:function (XMLHttpRequest, textStatus, errorThrown) {      
             
            		alert("XMLHttpRequest: "+XMLHttpRequest.status);
					alert("textStatus: "+textStatus);
					alert("errorThrown: "+errorThrown);
		            
          }
           
         
      });
      
      return JSON.stringify(result);
      //studentList.innerHTML = JSON.stringify(result);
       
}

 


function getGrade(){
      let result;
	var classID = document.getElementById('classID').value.substring(0,6);
      var studentID = document.getElementById('classID').value.substring(6);
      alert(studentID);
       
      data = {
            classID: classID,
            studentID: studentID,
            }
      
 
    var url = "user/grade";
  $.ajax({
   		type:"POST",
   		url:url,
    		async:false,
    	  	cache:false,
     	  	data:data,
    	  	dataType:"json",
    	  	success: function(data,textStaus,jqXHR){
                        result=data;
		        },
		       
            error:function (XMLHttpRequest, textStatus, errorThrown) {      
             
            		alert("XMLHttpRequest: "+XMLHttpRequest.status);
					alert("textStatus: "+textStatus);
					alert("errorThrown: "+errorThrown);
		            
          }
           
         
      });
      
      return JSON.stringify(result);
      //studentList.innerHTML = JSON.stringify(result);
       
}
