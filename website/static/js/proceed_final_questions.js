$("#proceed_with_final_questions").click(function(){
    alert("created interview");
    InterviewId = parseInt(sessionStorage.getItem('InterviewId'));
    const questions = JSON.parse(sessionStorage.getItem('finalQuestions'));
    const finalInterviewData = {
        'InterviewId':InterviewId,
        'questions':questions
    }
    $.ajax({
        url:'/create_interview',
        type:'POST',
        contentType : 'application/json',
        data : JSON.stringify(finalInterviewData),
        success : function(response){
            console.log(response);
            window.location.href = '/';

        }
    })
})
