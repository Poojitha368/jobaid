$(document).on('click','.ai-interview',function(){
    I_id = $(this).data('i_id');
    sessionStorage.setItem("I_id", I_id);
    window.location.href = '/ai_interview';
})

function FetchSpecificInterviewQuestions(I_id){
    console.log("session storage id",I_id);
        I_id = {
            "I_id":I_id
        }
        $.ajax({
            url:'/fetch_questions_ai_interview',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(I_id),
            success:function(response){
                console.log(response);
                DisplaySpecificInterviewQuestions(response)
            }
        })
    }
    
    
function DisplaySpecificInterviewQuestions(data){
        let I_name = data.I_name
        let questions = data.questions
        let totalQuestions = questions.length
        console.log("No of questions"+totalQuestions)
        
        if(!questions || questions.length==0){
            $('#ai-interview-questions').html("no questions");
            return;
        }
        console.log("display specific questions");
        console.log(questions);
        sno = 1
        questions.forEach((q,i)=>{
            setTimeout(()=>{
                let questionHtml = `
            <div class="question-container">
            <h3> Interview of : ${I_name}</h3>
            <b>Question ${sno} of ${totalQuestions}</b>
            ${escapeHtml(q.question)}
            </div>
            `
            sno+=1
            $('#ai-interview-questions').html(questionHtml);

            },i*5000);
            
    })
}