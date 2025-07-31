$('#filter-form').submit((e)=>{
    e.preventDefault();
    const skill = $('#skill').val();
    const difficulties = []
    $("input[name='difficulty']:checked").each(function(){
        difficulties.push($(this).val());
    })
    console.log(difficulties);
    const formData = {
        skill:skill,
        difficulties:difficulties
    }
    // console.log(`form submitted with skill ${formData.skill},${formData.difficulties}`)
    // ajax post request
    $.ajax({
        url:'/view_questions',
        type:'POST',
        contentType:'application/json',
        data:JSON.stringify(formData),
        success: function(response){
            console.log("server response",response);
            view_data_in_table(response);
            // alert("form submitted successfully");
        }
    })
})

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function view_data_in_table(questions){
    let tableHtml = `
    <table class='table'>
    <tr>
    <th></th>
    <th>ID</th>
    <th>question</th>
    <th>answer</th>
    <th>skill</th>
    <th>difficulty</th>
    </tr> `
    sno = 1
    questions.forEach(q =>{
        tableHtml += `
        <td><input type="checkbox" class="question-checkbox" data-qid=${q.q_id}></td>
        <td>${sno}</td>
        <td>${escapeHtml(q.question)}</td>
        <td>${escapeHtml(q.answer)}</td>
        <td>${q.skill}</td>
        <td>${q.difficulty}</td> 
        </tr>
        `
        sno+=1
    })

    tableHtml += `</table>`;
    $('#question-table').html(tableHtml);
    restoreCheckBoxes();
}

// we are using documnet as we are adding question dynamically using ajax so after document loads only this is checked
const checkedQuestions = new Set()
$(document).on('change','.question-checkbox',function(){
    Id = $(this).data('qid');
    if($(this).is(':checked')){
        checkedQuestions.add(Id);
    }
    else{
        checkedQuestions.delete(Id);
    }
    console.log(checkedQuestions);
})

// restoring the checkboxes
function restoreCheckBoxes(){
    $('.question-checkbox').each(function(){
        Id = $(this).data('qid');
        if(checkedQuestions.has(Id)){
            $(this).prop('checked',true);
        }
    })
}

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


$(document).ready(function(){
    if (window.location.pathname == "/view_final_questions"){
        renderFinalQuestions();
    }
})


function renderFinalQuestions(){
    const questions = JSON.parse(sessionStorage.getItem('finalQuestions'));
    if(questions.length==0){
        $('#final-questions').html("<p>No questions available select questions</p>");
        return;
    }
    let tableHtml = `
    <table class='table'>
    <tr>
    <th></th>
    <th>ID</th>
    <th>question</th>
    <th>answer</th>
    <th>skill</th>
    <th>difficulty</th>
    </tr> `
    sno = 1
    questions.forEach(q =>{
        tableHtml += `
        <td>${sno}</td>
        <td>${escapeHtml(q.question)}</td>
        <td>${escapeHtml(q.answer)}</td>
        <td>${q.skill}</td>
        <td>${q.difficulty}</td> 
        </tr>
        `
        sno+=1
    })

    tableHtml += `</table>`;
    $('#final-questions').html(tableHtml);
}

$("#proceed_with_final_questions").click(function(){
    alert("created interview");
    InterviewId = sessionStorage.getItem('InterviewId');
    const questions = sessionStorage.getItem('finalQuestions');
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
        }
    })
})

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



