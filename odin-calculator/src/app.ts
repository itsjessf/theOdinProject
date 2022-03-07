interface Board {
  drawBoard: () => void;
  updateBoard: (x: number, y: number, character: string) => void;
  cellIsPlayable: (x: number, y: number) => boolean;
  cellHasCharacter: (x: number, y: number, char: string) => boolean;
  winCon: (playedPos: { y: number; x: number }) => void;
}

const GameBoard: Board = (() => {
  const board: Array<string[]> = [
    ["i", "i", "i"],
    ["i", "i", "i"],
    ["i", "i", "i"],
  ];

  const drawBoard = () => {
    const app = document.getElementById("game");

    for (const [yAxis, row] of board.entries()) {
      const p = document.createElement("p");
      app?.appendChild(p);
      for (const [xAxies, element] of row.entries()) {
        const button = document.createElement("button");
        button.textContent = element;
        button.addEventListener("click", function () {
          updateBoard(yAxis, xAxies, "X")
          winCon({ y: yAxis, x: xAxies });
        });
        p.appendChild(button);
      }
    }
  };

  const updateBoard = (y: number, x: number, character: string) => {
    if (cellIsPlayable(y, x)) {
      return;
    }
    board[y][x] = character;
    console.log(board);
    const nodes = document.getElementById("game")?.childNodes;
    if (nodes) {
      nodes[y + 2].childNodes[x].textContent = character;
    }
  };

  const cellIsPlayable = (y: number, x: number) => {
    if (board[y][x] != "i") {
      return true;
    }
    return false;
  };

  const cellHasCharacter = (y: number, x: number, char: string) => {
    if (board[y][x] == char) {
      return true;
    }
    return false;
  };

  const getBoardRow = (y: number) => {
    return board[y];
  };

  const getBoardColumn = (x: number) => {
    return [board[0][x], board[1][x], board[2][x]];
  };

  const winCon = (playedPos: { y: number; x: number }) => {
    //Horizontal and Vertical Wincon
    const boardRow = getBoardRow(playedPos.y);
    const boardColumn = getBoardColumn(playedPos.x);

    if (
      boardRow.every((val, i, arr) => val === arr[0]) ||
      boardColumn.every((val, i, arr) => val === arr[0])
    ) {
      console.log("Thats a win");
    }
  };

  return { updateBoard, drawBoard, cellIsPlayable, cellHasCharacter, winCon };
})();

const computerSelection = () => {
  let randomY: number;
  let randomX: number;
  do {
    randomY = randomIntFromInterval(0, 2);
    randomX = randomIntFromInterval(0, 2);
  } while (GameBoard.cellIsPlayable(randomY, randomX) == true);
  GameBoard.updateBoard(randomY, randomX, "O");
  GameBoard.winCon({ y: randomY, x: randomX });
};

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function computerPlay() {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(computerSelection()), 3000);
  });
  await promise;
}



GameBoard.drawBoard();
computerPlay();

//to do : Game 
//to do : Check for vertical matches

