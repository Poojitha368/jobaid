$('#finalize-selected-questions').click(function(){
    finalizedQuestions = {
        "qid":Array.from(checkedQuestions)
    }
    $.ajax({
        url:"/finalize_questions",
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(finalizedQuestions),
        success:function(response){
            alert("finalized questions");
            console.log(response);
            sessionStorage.setItem('finalQuestions',JSON.stringify(response));
            window.location.href='/view_final_questions';
        }
    })
})