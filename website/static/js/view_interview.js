$(document).on('click','.view-interview',function(){
    I_id = $(this).data('i_id');
    sessionStorage.setItem("I_id", I_id);
    window.location.href = '/view_interview';
})

function FetchSpecificInterviewQuestions(I_id){
    console.log("session storage id",I_id);
        I_id = {
            "I_id":I_id
        }
        $.ajax({
            url:'/fetch_interview_questions',
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
        
        if(!questions || questions.length==0){
            $('#view-interview-questions').html("no questions");
            return;
        }
        console.log("display specific questions");
        console.log(questions);
        let tableHtml = `
        <h3> Interview : ${I_name}</h3>
        <table class='table'>
        <tr>
        <th>S.No</th>
        <th>question</th>
        <th>Skill</th>
        <th>Difficulty</th>
        </tr> `
        sno = 1
        questions.forEach(q=>{
            tableHtml += `
            <tr>
            <td>${sno}</td>
            <td>${escapeHtml(q.question)}</td>
            <td>${escapeHtml(q.skill)}</td>
            <td>${escapeHtml(q.difficulty)}</td>
            <td><button class="btn btn-primary delete-question w-20" data-iq_id=${q.iq_id}>delete</button></td>
        </tr>
        `
        sno+=1
    })
    tableHtml += `</table>`;
    $('#view-interview-questions').html(tableHtml);
}