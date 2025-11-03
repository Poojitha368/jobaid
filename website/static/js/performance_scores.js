function PerformanceScores(){
    questions = JSON.parse(sessionStorage.getItem("questions"));
    answers = JSON.parse(sessionStorage.getItem("answers"));
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
            <td>${answers[index]}</td>
            <td>10</td>
            </tr>
            `
        })

        tableHtml += `</table>`;
        $('#performance-scores').html(tableHtml);
        }
    showInTable();
}
