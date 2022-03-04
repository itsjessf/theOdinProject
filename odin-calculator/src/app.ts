interface Board {
  drawBoard: () => void;
  updateBoard: (x: number, y: number, character: string) => void;
  startBoard: () => void;
}


const gameBoard: Board = (() => {
  let board: Array<string[]>;

  const startBoard = () => {
    board = [
      ["i", "i", "i"],
      ["i", "i", "i"],
      ["i", "i", "i"],
    ];
  };
  const drawBoard = () => {
    const app = document.getElementById("game");

    for (const row of board) {
      const p = document.createElement("p");
      app?.appendChild(p);
      for (const element of row) {
        const button = document.createElement("button");
        button.textContent = element;
        p?.appendChild(button);
      }


    }
  };

  const updateBoard = (x: number, y: number, character: string) => {
        board[y][x] = character;
        console.log(board);

  };

  return { updateBoard, drawBoard, startBoard };
})();

gameBoard.startBoard();
gameBoard.updateBoard(1, 2, "X");
gameBoard.updateBoard(2, 2, "O");
gameBoard.drawBoard();

