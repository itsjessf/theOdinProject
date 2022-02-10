const gameOptions = ["rock", "paper", "scissors"];
let winMessage = "Congrats, you won!";
let lossMessage = "Sorry man, you kinda suck";
let invalidInputMessage = "The move you made is not valid";
let tieMessage = "It's a tie!";

let resultH4 = document.querySelector(".result");
let computerPick = document.querySelector(".computer-pick");

document.querySelectorAll(".button").forEach((move) => {
  move.addEventListener("click", (event) => {
    resultH4.innerHTML = results(move.textContent.toLowerCase()).toString();
    
  });
});

/*function isUserInputValid(playerSelection) {
  return gameOptions.includes(playerSelection);
}*/

function computerPlay() {
  return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}

function results(playerSelection) {
  let score = playRound(playerSelection);
  if (score == 1) {
    return winMessage;
  } else if (score == -1) {
    return lossMessage;
  } else {
    return tieMessage;
  }
}

function playRound(playerSelection) {
  let computerSelection = computerPlay();
  console.log(computerSelection);
  computerPick.innerHTML = "Computer's move: " + computerSelection.toString();
 
  let score;
  if (playerSelection == computerSelection) {
    return 0;
  }
  switch (playerSelection) {
    case "rock":
      if (computerSelection == "scissors") {
        return 1;
      }
    case "paper":
      if (computerSelection == "rock") {
        return 1;
      }
    case "scissors":
      if (computerSelection == "paper") {
        return 1;
      }
    default:
      return -1;
  }
}
