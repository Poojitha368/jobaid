function PerformanceScores(){
    questions = JSON.parse(sessionStorage.getItem("questions"));
    user_answers = JSON.parse(sessionStorage.getItem("StoredAnswers"));
    stored_scores = JSON.parse(sessionStorage.getItem("StoredScores"));
    console.log(questions);
    console.log(answers);
    function showInTable(){
        let tableHtml = `
        <table class='table'>
        <tr>
        <th>Sno</th>
        <th>question</th>
        <th>answer</th>
        <th>Your answer</th>
        <th>Scores</th>
        </tr> `
        questions.forEach((q,index) =>{
            tableHtml += `
            <td>${index+1}</td>
            <td>${escapeHtml(q.question)}</td>
            <td>${escapeHtml(q.answer)}</td>
            <td>${user_answers[index]}</td>
            <td>${stored_scores[index]}</td>
            </tr>
            `
        })

        tableHtml += `</table>`;
        $('#performance-scores').html(tableHtml);
        }
    showInTable();
}
