scores = []
function ScoreAnswer(userAnswer){
    // get correct questions's answer for grading
    let correctAnswer = $('.question-container').data("correct-answer");

    Answers = {
        'user_answer':userAnswer,
        'correct_answer':correctAnswer
    }


    $.ajax({
        url : '/score_answer',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(Answers),
        success : function(response){
            console.log(response.score);
            score = response.score;
            scores.push(score);
            sessionStorage.setItem("StoredScores",JSON.stringify(scores));
        }
    })
}