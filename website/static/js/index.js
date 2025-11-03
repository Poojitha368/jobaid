$(document).ready(function(){
    let I_id = sessionStorage.getItem("I_id");
    if(window.location.pathname == '/view_interview' || window.location.pathname == '/ai_interview'){
        if(I_id){
            FetchSpecificInterviewQuestions(I_id);
        }
        else{
            $('view-interview-questions').html("No inteview selected");
        }
    }
    if (window.location.pathname == "/view_final_questions"){
        renderFinalQuestions();
    }
    if (window.location.pathname == "/performance_scores"){
        PerformanceScores();
    }
})



