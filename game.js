/******starting the game******** */
var started=false;

$("body").on("keyup", function () {
    if(!started){
        botColorSequence = [];
        level=0;
        $("body").removeClass("game-over");
        $("h1").text("level " + level);
        nextSequence();
        started=true;
    }
});





/*the color array*/
var colors = ["red", "green", "blue", "yellow"]



/********levels */
var level = 0;






/*arrays that include real color pattern and user clicked pattern*/
var botColorSequence = [];
var clickPattern = [];
var lastNumber = (clickPattern.length) - 1;
var lastNumber1 = (botColorSequence.length) - 1;



/*generating a sequence*/
function nextSequence() {
    
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var botChosenColor = colors[randomNumber];
    //console.log(botChosenColor);
    botColorSequence.push(botChosenColor);

    $("#" + botChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    makeSound(botChosenColor);
    clickPattern = [];

    console.log(botColorSequence);
}







/****sequence on user click*/
$(".btn").on("click", function () {
    var clickedColor = this.id;

    clickPattern.push(clickedColor);
    //console.log(clickPattern);


    makeSound(clickedColor);

    visualEffects(clickedColor);

    checkAnswer(clickPattern.length-1);


});


function checkAnswer(currentLevel) {

    if(clickPattern[currentLevel] === botColorSequence[currentLevel]){
        
        if(clickPattern.length===botColorSequence.length ){
            setTimeout(() => {
                nextSequence(); 
            }, 1000);
            
        }
    }
    else{
        makeSound("wrong");
        $("h1").text("You lost,Press Any Key To Start Again.");
        $("body").addClass("game-over");
        started=false;

    }

   /* var clickIndex = clickPattern.indexOf(clickedColor);
    console.log(clickedColor);


    console.log(clickPattern);

    if (clickPattern[clickIndex] == botColorSequence[clickIndex]) {

        console.log("right");
        if (clickPattern[lastNumber] == botColorSequence[lastNumber1]) {

            setTimeout(() => {
                nextSequence();
            }, 1000);

        } else {
            console.log("you lost");
        }
    } else {
        console.log("lost");
    }*/
}




/**making sound on clicks or bot seq generation */
function makeSound(colorSound) {
    var audio = new Audio("sounds/" + colorSound + ".mp3");
    audio.play();
}



/***visual effects on clicks */

function visualEffects(a) {
    $("#" + a).addClass("pressed");

    setTimeout(() => {
        $("#" + a).removeClass("pressed");
    }, 100);
}