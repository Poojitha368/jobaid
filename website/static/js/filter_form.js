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