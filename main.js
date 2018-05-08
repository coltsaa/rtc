function hasUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
// //Handling multiple devices
// MediaStreamTrack.getSources(function(sources) {
//             var audioSource = null;
//             var videoSource = null;
//             for (var i = 0; i < sources.length; ++i) {
//                 var source = sources[i];
//                 if (source.kind === "audio") {
//                     console.log("Microphone found:", source.label, source.id);
//                     audioSource = source.id;
//                 } else if (source.kind === "video") {
//                     console.log("Camera found:", source.label, source.id);
//                     videoSource = source.id;
//                 } else {
//                     console.log("Unknown source found:", source);
//                 }
//             }

if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    var video = document.querySelector('video'),
        canvas = document.querySelector('canvas'),
        streaming = false;
    navigator.getUserMedia({
        video: true,
        audio: true
    }, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        streaming = true;
    }, function(error) {
        console.log("Raised an error when capturing:", error);
    });
    var filters = ['', 'grayscale', 'sepia', 'invert'],
        currentFilter = 0;
    document.querySelector('#capture').addEventListener('click',
        function(event) {
            if (streaming) {
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);
                currentFilter++;
                if (currentFilter > filters.length - 1) currentFilter = 0;
                canvas.className = filters[currentFilter];
            }
        });
} else {
    alert("Sorry, your browser does not support getUserMedia.");
}
