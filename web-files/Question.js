 
var questionType;
var questionBody;
var answer;
var place;
var hasQuestion = false;
 


 

//insert new student into database
function getQuestion(){
	var questionID = 5; // change the logic here to get questionID randomly and not repeatly
	 
 	var data = {
    		"questionID":questionID,	 
  			};
    var url = "user/getQuestion";
    
  $.ajax({
   		type:"POST",
   		url:url,
    		async:false,
    	  	cache:false,
    	  	data:data,
    	  	dataType:"json",
    	  	success: function(data,textStaus,jqXHR){
    	  	if( data.status == "success"){
                  questionType = data.type;
                  questionBody = data.questionBody;
                  answer = data.answer;
                  place = data.place;
                  hasQuestion = true;
		        }
                  },
		       
            error:function (XMLHttpRequest, textStatus, errorThrown) {      
             
            		alert("XMLHttpRequest: "+XMLHttpRequest.status);
					alert("textStatus: "+textStatus);
					alert("errorThrown: "+errorThrown);
		            
          }
           
         
      });

      var contends = document.getElementById("sid");
      contends.innerHTML=questionBody;
      alert(questionBody);
      
   }


