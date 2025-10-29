$(document).ready(function(){
    if (window.location.pathname == "/view_final_questions"){
        renderFinalQuestions();
    }
    if(window.location.pathname == '/view_interview'){
        let I_id = sessionStorage.getItem("I_id");
        if(I_id){
            FetchSpecificInterviewQuestions(I_id);
        }
        else{
            $('view-interview-questions').html("No inteview selected");
        }
    }
})


