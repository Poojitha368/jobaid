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