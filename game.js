var buttonColors = ["red", "blue" , "green" , "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var count = 0;
var level = 0;
$(document).keydown(function(event){
    startSequence();
});
function startSequence(){
    if(count == 1){
        return;
    }
    count  = 1;
    nextSequence();
}
function nextSequence(){
    userChosenPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    $("h1").text("Level "+level++);    
}

$(".btn").click(function(event){
    var clickedButton = $(this);
    var userChosenColor = clickedButton.attr("id");
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    clickedButton.addClass("pressed");
    setTimeout(function (){
        clickedButton.removeClass("pressed")
    },100);
    checkAnswer(userChosenPattern.length-1);
});

function playSound(clr){
    switch(clr){
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            break;
    }  
}
function startOver(){
    count = 0;
    level = 0;
    userChosenPattern = [];
    gamePattern = [];
    $(document).keydown(function(event){
        startSequence();
    });
}
function checkAnswer(currentLevel){
    if(userChosenPattern[currentLevel] == gamePattern[currentLevel]){
        if(userChosenPattern.length == gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong");
            $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}