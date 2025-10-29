$('#list-interviews').click(function(){
    console.log("button clicked");
    fetchAndRenderInterviews();
    
})

function fetchAndRenderInterviews(){
    $.ajax({
        url:"/list_interviews",
        type:"GET",
        contentType:"application/json",
        success:function(response){
            console.log("got interview questions");
            listAllInterviews(response);
        }
    })
}

function listAllInterviews(interviewList){
    if(interviewList.length==0){
        $('#interviews-container').html("<p>No interviews available add interview</p>");
        return;
    }
    InterviewsContainer = `
    <div class="container text-center">
    <div class="row row-cols-3">`

    interviewList.forEach(interview =>{
        InterviewsContainer += `
        <div class="col mt-3">
        <div class="card interview-card text-center" data-i_id=${interview.I_id}>
        <div class="card-body">
        <h5 class="card-title">${interview.I_name}</h5>
        <a href="/ai_interview" class="btn btn-primary w-30">AI interview</a>
        <button class="btn btn-primary delete-interview w-20" data-i_id=${interview.I_id}>delete</button>
        <button class="btn btn-primary view-interview w-20" data-i_id=${interview.I_id}>view</button>
        </div>
        </div>
        </div>`
    })
    InterviewsContainer += `
    </div>
    </div>`
    $('#interviews-container').html(InterviewsContainer);
}
