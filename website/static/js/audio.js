function setupAudioRecording(){
    let mediaRecorder;
    let audioChunks = []
    $(document).on('click','#startRecord',function(){
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream =>{
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            audioChunks = [];

           $(mediaRecorder).on('dataavailable',function(event){
            audioChunks.push(event.originalEvent.data)
           });

            $(mediaRecorder).on('stop',function(){
                const audioBlob = new Blob(audioChunks, {type: 'audio/webm'});
                const formData = new FormData();
                formData.append('audio',audioBlob,'recording.webm');
                convertToText(formData);
            });
            
            $('#startRecord').prop('disabled', true);
            $('#stopRecord').prop('disabled', false);
        })
        .catch(err =>{
            alert('Microphone access denied: ' + err);
        })
    });


    $('#stopRecord').click(function(){
        mediaRecorder.stop();
        $('#startRecord').prop('disabled', false);
        $('#stopRecord').prop('disabled', true);
    })
}

answers = []
function convertToText(formData){
    $.ajax({
        url : '/convert_audio_to_text',
        type: 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(response){
            console.log(response);
            answer = response.text
            ScoreAnswer(answer);

            $('#audioText').text(answer);
            answers.push(answer);
            console.log(answers);
            sessionStorage.setItem("StoredAnswers",JSON.stringify(answers))


            // // audio play
            // const audioUrl = URL.createObjectURL(audioBlob);
            // $('#audio-playback').attr('src', audioUrl);
        }
    })
}