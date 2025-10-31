function setupAudioRecording(){
    let mediaRecorder;
    let audioChunks = []
    $('#startRecord').click(function(){
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream =>{
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            audioChunks = [];

            mediaRecorder.ondataavailable = event =>{
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = ()=>{
                const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
                const audioUrl = URL.createObjectURL(audioBlob);
                console.log(audioUrl);
                $('#audio-playback').attr('src', audioUrl);
            };
            
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
