$(document).on("click", ".ai-interview", function () {
  I_id = $(this).data("i_id");
  sessionStorage.setItem("I_id", I_id);
  window.location.href = "/ai_interview";
});

function FetchSpecificInterviewQuestions(I_id) {
  console.log("session storage id", I_id);
  I_id = {
    I_id: I_id,
  };
  $.ajax({
    url: "/fetch_questions_ai_interview",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(I_id),
    success: function (response) {
      console.log(response);
      DisplaySpecificInterviewQuestions(response);
    },
  });
}

function DisplaySpecificInterviewQuestions(data) {
  let I_name = data.I_name;
  let questions = data.questions;
  let totalQuestions = questions.length;
  console.log("No of questions" + totalQuestions);

  if (!questions || questions.length == 0) {
    $("#ai-interview-questions").html("no questions");
    return;
  }

  let current_Index = 0;
  console.log("display specific questions");
  console.log(questions);

  function showQuestion(index) {
    if (index >= totalQuestions) {
      $("#ai-interview-questions").html("<h3>Interview completed");
      sessionStorage.setItem("questions",JSON.stringify(questions));
      window.location.href = "/performance_scores";
      return;
    }
    let q = questions[index];
    let questionHtml = `
            <div class="question-container">
            <h3> Interview of : ${I_name}</h3>
            <b>Question ${index + 1} of ${totalQuestions}</b>
            ${escapeHtml(q.question)}
            
            <div id="audio">
            <button id="startRecord">Start recording</button>
            <button id="stopRecord">Stop recording</button> 
            <audio id="audio-playback" controls></audio>
            <div id="audioText"></div>
            </div>
            <button id="next-question">Next Question</button> 
            </div>
            `;
    $("#ai-interview-questions").html(questionHtml);
    setupAudioRecording();
  }

  $(document).on('click','#next-question',function(){
      current_Index += 1;
      showQuestion(current_Index);
    });

  showQuestion(current_Index);
}
