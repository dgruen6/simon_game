var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = -1;

function flashButton(element) {
  $(element).fadeOut(100).fadeIn(100);
}

function playSound(element) {
  let userChosenColor = $(element).attr("id");
  let audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
}

function nextSequence() {
  // Update h1
  $("h1").text("Level " + level)

  // Generate next random color
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];

  // Flash button and play sound
  flashButton("#" + randomChosenColor);
  playSound("#" + randomChosenColor);

  // Write current color to array
  gamePattern.push(randomChosenColor);

  // Increment level counter
  level = level + 1;
}

function checkAnswer() {
  checkIndex = userClickedPattern.length - 1;
  if (userClickedPattern[checkIndex] == gamePattern[checkIndex]) {
    console.log("Correct input. Proceed!");
    return "correct";
  }
  else {
    console.log("Wrong input. Start over");
    return "wrong";
  }
}

function gameOver() {
  // Play wrong sound
  let audio = new Audio("sounds/wrong.mp3");
  audio.play();

  // Flahs background red
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)

  // Game over message in h1
  $("h1").text("Game Over, Press Any Key to Restart")

  // Reset game
  userClickedPattern = [];
  gamePattern = [];
  level = -1;
}

// Make buttons flash and play audio when clicked
$(".btn").click(function() {
  if (level > 0) {
    // Flash
    flashButton(this);
    // Audio
    playSound(this);
    // Store color in array
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    // Check user input against expected input
    if (checkAnswer() == "wrong") {
      gameOver();
    }
    // Next level if all colors right in current level
    else if (userClickedPattern.length == gamePattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  }
});

// Detect when user has pressed a key to start game
$(document).keypress(function() {
  if (level < 0) {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    setTimeout(nextSequence, 500);
  }
})
