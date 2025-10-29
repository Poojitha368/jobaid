function renderFinalQuestions(){
    const questions = JSON.parse(sessionStorage.getItem('finalQuestions'));
    if(questions.length==0){
        $('#final-questions').html("<p>No questions available select questions</p>");
        return;
    }
    let tableHtml = `
    <table class='table'>
    <tr>
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