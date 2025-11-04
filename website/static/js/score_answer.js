function ScoreAnswer(userAnswer){
    // get correct questions's answer for grading
    let correctAnswer = $('.question-container').data("correct-answer");

    answers = {
        'user_answer':userAnswer,
        'correct_answer':correctAnswer
    }


    $.ajax({
        url : '/score_answer',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(answers),
        success : function(response){
            console.log(response);
        }
    })
}