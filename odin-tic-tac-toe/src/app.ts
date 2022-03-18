interface Board {
  drawBoard: () => void;
  playCell: (x: number, y: number, playerType: PlayerTypes) => void;
  isGameFinished: () => boolean;
  isCellPlayable: (y: number, x: number) => boolean;
  displayWinner: () => void;
  restartGame: () => void;
}

enum PlayerTypes {
  human = "X",
  computer = "O",
}

const GameBoard: Board = (() => {
  const initialState = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    currentPlayer: PlayerTypes.human,
    gameIsFinished: false,
    winner: "No one",
  };

  let state = { ...initialState };

  const restartGame = () => {
    console.log("The Game restarted");
    state = { ...initialState };
    state.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const drawBoard = () => {
    const paragraph = document.getElementById("game")?.children;
    if (typeof paragraph == "undefined") {
      console.log("yo app doesnt exist");
      return;
    }
    for (const [yAxis, row] of state.board.entries()) {
      for (const [xAxies, element] of row.entries()) {
        const button = paragraph[yAxis].children[xAxies];
        button.textContent = element;
      }
    }
  };

  const playCell = (y: number, x: number, playerType: PlayerTypes) => {
    if (!isCellPlayable(y, x)) {
      console.log("Not a playable cell");
      return;
    }
    if (playerType !== state.currentPlayer) {
      console.log("You are not the current player");
      return;
    }
    state.board[y][x] = playerType;
    drawBoard();
    winCon(y, x);
    drawCon();
    if (isGameFinished()) {
      return;
    }
    state.currentPlayer =
      state.currentPlayer === PlayerTypes.human
        ? PlayerTypes.computer
        : PlayerTypes.human;
  };

  const isCellPlayable = (y: number, x: number) => {
    return state.board[y][x] == "" ? true : false;
  };

  const winCon = (y: number, x: number) => {
    const boardRow = state.board[y];
    const boardColumn = [
      state.board[0][x],
      state.board[1][x],
      state.board[2][x],
    ];
    const boardDiagonalLeft = [
      state.board[2][0],
      state.board[1][1],
      state.board[0][2],
    ];
    const boardDiagonalRight = [
      state.board[0][0],
      state.board[1][1],
      state.board[2][2],
    ];

    if (
      boardRow.every((val, i, arr) => val === arr[0]) ||
      boardColumn.every((val, i, arr) => val === arr[0])
    ) {
      calculateWinner(y, x);
    }

    // Diagonal win cons
    if (x == y) {
      if (boardDiagonalRight.every((val, i, arr) => val === arr[0])) {
        calculateWinner(y, x);
      }
    }

    if ((x == 0 && y == 2) || (x == 2 && y == 0) || (x == 1 && y == 1)) {
      if (boardDiagonalLeft.every((val, i, arr) => val === arr[0])) {
        calculateWinner(y, x);
      }
    }
  };

  const drawCon = () => {
    let numberOfPlayedCells = 0;
    for (const row of state.board) {
      for (const cell of row) {
        if (cell != "") {
          numberOfPlayedCells++;
        }
      }
    }
    if (numberOfPlayedCells == 9) {
      console.log("No one wins");
      state.gameIsFinished = true;
      displayWinner();
    }
  };

  const isGameFinished = () => {
    return state.gameIsFinished === true ? true : false;
  };

  const calculateWinner = (y: number, x: number) => {
    console.log("Thats a win");
    state.gameIsFinished = true;
    const character: string = state.board[y][x];
    PlayerTypes.human === character
      ? (state.winner = "Human")
      : (state.winner = "Computer");
    displayWinner();
  };

  const displayWinner = () => {
    const popUp = document.getElementById("popup");
    const blur = document.getElementById("blur");
    console.log(blur);
    const popUpChildren = popUp?.children;
    if (
      typeof popUp == "undefined" ||
      typeof popUpChildren == "undefined" ||
      typeof blur == "undefined"
    ) {
      console.log("yo the pop up doesnt exist");
      return;
    }
    popUpChildren[1].innerHTML = state.winner + "!";
    blur?.classList.toggle("active");
    popUp?.classList.toggle("active");
  };

  return {
    playCell,
    drawBoard,
    isGameFinished,
    isCellPlayable,
    displayWinner,
    restartGame,
  };
})();

const computerSelection = async () => {
  setTimeout(() => {
    let randomY: number;
    let randomX: number;
    do {
      randomY = randomIntFromInterval(0, 2);
      randomX = randomIntFromInterval(0, 2);
    } while (GameBoard.isCellPlayable(randomY, randomX) == false);

    GameBoard.playCell(randomY, randomX, PlayerTypes.computer);
  }, randomIntFromInterval(10, 1000));
};

const playerSelection = (x: number, y: number) => {
  GameBoard.playCell(x, y, PlayerTypes.human);
};

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addEventListeners() {
  const paragraph = document.getElementById("game")?.children;
  if (typeof paragraph == "undefined") {
    console.log("yo app doesnt exist");
    return;
  }
  for (let x = 0; x < paragraph.length; x++) {
    for (let y = 0; y < paragraph[x].children.length; y++) {
      const button = paragraph[x].children[y];

      button.addEventListener(
        "click",
        function () {
          playerSelection(x, y);
          if (GameBoard.isGameFinished()) {
            return;
          }
          computerSelection();
        },
        { once: true }
      );
    }
  }
  return;
}

function restart() {
  GameBoard.restartGame();
  const popUp = document.getElementById("popup");
  const blur = document.getElementById("blur");

  if (typeof popUp == "undefined" || typeof blur == "undefined") {
    console.log("yo the pop up doesnt exist");
    return;
  }

  popUp?.classList.toggle("active");
  blur?.classList.toggle("active");

  Game();
}

const Game = () => {
  console.log("New Game");
  GameBoard.drawBoard();
  addEventListeners();
};

Game();
