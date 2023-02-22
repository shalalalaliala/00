Webcam.set({
width:350,
height:200,
image_format: 'png',
png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="img1" src="'+data_uri+'"/>';
    }) ;
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded() {
    console.log('model Loaded');
};

prediction1= "";
prediction2="";

function speak() {
var synth = window.speechSynthesis;
speak1 = "Prediction 1 is" + prediction1;
speak2 = "Prediction 2 is" + prediction2;
var utterThis = new speechSynthesisUtterance(speak1 + speak2);
synth.speak(utterThis);
} 

function check() {
    img = document.getElementById('img1');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("emotion1_result").innerHTML = results[0].label;
        document.getElementById("emotion2_result").innerHTML = results[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
    

    if(results[0].label == "happy")
    {
        document.getElementById("emoji1_update").innerHTML = "&#128522;";
    }
    if(results[0].label == "sad")
    {
        document.getElementById("emoji1_update").innerHTML = "&#128546;";
    }
    if(results[0].label == "angry")
    {
        document.getElementById("emoji1_update").innerHTML = "&#128545;";
    }

    if(results[1].label == "happy")
    {
        document.getElementById("emoji2_update").innerHTML = "&#128522;";
    }
    if(results[1].label == "sad")
    {
        document.getElementById("emoji2_update").innerHTML = "&#128546;";
    }
    if(results[1].label == "angry")
    {
        document.getElementById("emoji2_update").innerHTML = "&#128545;";
    }
}
}