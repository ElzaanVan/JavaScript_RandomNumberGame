//Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guesses = 3;

//UI variables

const game = document.querySelector(".game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  input = document.querySelector("#guess-input"),
  button = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

//Assign values to minNum and maxNum
minNum.textContent = min;
maxNum.textContent = max;

//Listen for mouse down to trigger Try Again
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "try-again") {
    window.location.reload();
  }
});

//Listen for button press
button.addEventListener("click", function () {
  let guess = parseInt(input.value);

  //Validation
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  //Win case
  if (guess === winningNum) {
    gameOver(true, `Good guess, ${winningNum} is correct. You Win!`);
  } else {
    guesses = guesses - 1;
    //Lose Case
    if (guesses === 0) {
      gameOver(
        false,
        `Oops! Better luck next time, the correct number was ${winningNum}.`
      );
    } else {
      //Guesses Left
      input.value = "";
      setMessage(`Nope, you have ${guesses} more guesses left`, "red");
      input.style.borderColor = "red";
    }
  }
});

//Get Random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  setMessage(msg);
  input.style.borderColor = color;
  message.style.color = color;
  input.disabled = "true";

  //Play Again
  button.value = "Try again";
  button.className = "try-again";
}
