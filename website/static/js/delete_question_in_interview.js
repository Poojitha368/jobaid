$(document).on('click','.delete-question',function(){
    iq_id = $(this).data('iq_id');
    dq_id = {
        "dq_id" : iq_id
    }
    $.ajax({
        url : '/delete_question',
        type: 'POST',
        contentType : 'application/json',
        data : JSON.stringify(dq_id),
        success : function(response){
            console.log(response);
            I_id = sessionStorage.getItem("I_id");
            if(I_id){
                FetchSpecificInterviewQuestions(I_id);
            }
        }
    })
})