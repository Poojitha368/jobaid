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

            mediaRecorder.onstop = async()=>{
                const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
                const base64Audio = await blobToBase64(audioBlob);
                console.log(base64Audio);
                const audioUrl = URL.createObjectURL(audioBlob);

                console.log(audioUrl);
                $('#audio-playback').attr('src', audioUrl);

                convertToText(base64Audio);
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

function blobToBase64(blob){
    // asynchronus
    return new Promise((resolve,reject) =>{
        const reader = new FileReader();
        reader.onloadend = ()=> resolve(reader.result.split(',')[1]); // remove "data:audio/wav;base64,  from data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEA..."
        reader.onerror = reject;
        reader.readAsDataURL(blob);

    });
}


function convertToText(base64Audio){
    audioData = {
        audioData : base64Audio
    }
    $.ajax({
        url : '/convert_audio_to_text',
        type: 'POST',
        contentType : 'application/json',
        data : JSON.stringify(audioData),
        success : function(response){
            console.log(response);
        }
    })
}