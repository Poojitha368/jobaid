$(document).on('click','.delete-interview',function(){
    I_id = $(this).data('i_id');
    // console.log(I_id);
    deletionId = {
        "dId":I_id
    }
    $.ajax({
        url:'/delete_interview',
        type:'POST',
        contentType:'application/json',
        data:JSON.stringify(deletionId),
        success:function(response){
            console.log("deletion sucessfully");
            fetchAndRenderInterviews();
        }
    })
})