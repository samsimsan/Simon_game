//variables used---------------------------------------
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$("h1").click(function(event) {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//blink and play the sound of the button clicked by the user and push it in userClickedPattern
$(".btn").click(function(event) {
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);

  playthesound(userChosenColor);
  animatePress(userChosenColor);
  console.log("userClickedPattern.length-1: " + (userClickedPattern.length - 1));
  console.log("current user list: " + userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("user: " + userClickedPattern + " \ngamePattern: " + gamePattern);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        console.log("sequence complete");
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("user: " + userClickedPattern + " \ngamePattern: " + gamePattern);
    console.log("wrong cuz:\n" + "currentLevel: " + currentLevel + "\nuser: " + userClickedPattern[currentLevel] + " \ngamePattern: " + gamePattern[currentLevel]);
    playthesound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Click here to begin again");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}


//generates the next button in sequence for the player to click
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playthesound(randomChosenColour);
  showTheBox(randomChosenColour);
}


function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}


//makes the buttons clicked to blink
function showTheBox(box) {
  $("#" + box).fadeOut(100);
  $("#" + box).fadeIn(100);
}

//plays the sound that is asked
function playthesound(color) {
  const audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
