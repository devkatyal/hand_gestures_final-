prediction_1=""
prediction_2=""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png", 
    png_quality: 90
});

var camera= document.getElementById("camera");
Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id= "captured_img" src="'+data_uri+'">'

    }
    );
}

console.log("ml5version:", ml5.version);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wDEFVhY6W/model.json", model_loaded);

function model_loaded(){

console.log("model is loaded!")
};

function speak(){
    var synth= window.speechSynthesis;
    data_1="The first prediction is:"+ prediction_1;
    data_2="The second prediction is:"+ prediction_2;
    var utter= new SpeechSynthesisUtterance( data_1 + data_2 );
    synth.speak(utter);
}

function identify(){
img= document.getElementById("captured_img");
classifier.classify(img,gotResult);
}

function gotResult(error, result){
    if(error){
console.error(error);
    }
    else{
        console.log(result);
        prediction_1= result[0].label;
        prediction_2= result[1].label;

        document.getElementById("result_gesture_name").innerHTML= result[0].label; 
     
        document.getElementById("result_gesture_name2").innerHTML= result[1].label;
     
        speak()

        if(result[0].label=="best"){

        document.getElementById("update_gesture").innerHTML= " &#128077" ;
    } 

    
    if(result[0].label=="amazing"){

        document.getElementById("update_gesture").innerHTML= "&#128076" ;
    } 

    if(result[0].label=="victory"){

        document.getElementById("update_gesture").innerHTML= " &#9996" ;
    } 

    if(result[1].label=="best"){

        document.getElementById("update_gesture2").innerHTML= " &#128077" ;
    } 

    
    if(result[1].label=="amazing"){

        document.getElementById("update_gesture2").innerHTML= "&#128076" ;
    } 

    if(result[1].label=="victory"){

        document.getElementById("update_gesture2").innerHTML= " &#9996" ;
    } 
    
    }
}
