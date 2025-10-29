InterviewName = ""

$("#create-interview").click(function(){
    $('#InterviewForm').css('visibility','visible');
})

$("#interview-form").submit(function(e){
    e.preventDefault();
    let InterviewName="";
    InterviewName = {
        "name": $('#interview-name').val()
    };
    
    console.log(InterviewName);
    $.ajax({
        url:"/sumit_interview_form",
        type:"POST",
        contentType:"application/json",
        data : JSON.stringify(InterviewName),
        success : function(response){
            console.log(response.new_interviewId);
            sessionStorage.setItem('InterviewId',response.new_interviewId);
            window.location.href = '/filter_form';
        }
    })
})