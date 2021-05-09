var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern= [];

var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level"+level);
        newSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              newSequence();
            }, 1000);
    
          }
    
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },100);
        $("#level-title").text("game over, press any key to restart");

        startOver();
          console.log("wrong");
        }
        
        

}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function newSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}





