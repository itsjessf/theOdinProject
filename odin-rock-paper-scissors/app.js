const gameOptions = ["rock", "paper", "scisors"];
let winMessage = "Congrats, you won!";
let lossMessage = "Sorry man, you kinda suck";
let invalidInputMessage = "The move you made is not valid";
let tieMessage = "It's a tie!";

const playerSelection = window.prompt("Make your selection").toLowerCase();

function isUserInputValid(playerSelection) {
  return gameOptions.includes(playerSelection);
}

function computerPlay() {
  return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}

function playRound(playerSelection) {
  const computerSelection = computerPlay();
  console.log(computerSelection);
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
    case "scissor":
      if (computerSelection == "paper") {
        return 1;
      }
    default:
      return -1;
  }
}

function game(rounds) {
  if (!isUserInputValid) {
    return invalidInputMessage;
  }
  let score = 0;

  for (let i = 0; i < 5; i++) {
    score += playRound(playerSelection);
  }
  console.log(score);
  if (score > 0) {
    return winMessage;
  } else if (score < 0) {
    return lossMessage;
  } else {
    return tieMessage;
  }
}

console.log(game(5));
