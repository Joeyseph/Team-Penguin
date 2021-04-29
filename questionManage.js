 


function addQuestion(){
	var type = document.getElementById('type').value;
      var questionBody = document.getElementById('questionBody').value;    
      var answer = document.getElementById('answer').value;
      
      if(type == "add.sub"){
             
            data = {
                  "questionType": type,
                  "questionBody":questionBody,
                  "answer": answer,
                  "place":null,
                  "number":null
            }
      }else{
            var place = document.getElementById('place').value;
            data = {
                  "questionType": type,
                  "questionBody":null,
                  "answer": answer,
                  "place":place,
                  "number":questionBody
      }
}
    var url = "user/addQuestion";
  $.ajax({
   			type:"POST",
   			url:url,
    		async:false,
    	  	cache:false,
     	  	data:data,
    	  	dataType:"json",
    	  	success: function(data,textStaus,jqXHR){
     	  	if( data.status == "success"){ 
		        		alert("Question is Inserted");
		        	}else if(data.status == "existed"){
		        		alert("This question is already in the database");
		        	}else{
                                alert("1");
                          }
		        },
		       
            error:function (XMLHttpRequest, textStatus, errorThrown) {      
             
            		alert("XMLHttpRequest: "+XMLHttpRequest.status);
					alert("textStatus: "+textStatus);
					alert("errorThrown: "+errorThrown);
		            
          }
           
         
      });
}