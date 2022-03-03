interface Board {
  drawBoard: () => void;
  updateBoard: (coordinate: number[], character: string) => void;
  startBoard : () => void
}

const gameBoard: Board = (() => {
  let board: Array<string[]>;

  const startBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const drawBoard = () => {
    for (const row of board) {
      console.log(`${row[0]} ${row[1]} ${row[2]}`);
    }
  };

  const updateBoard = (coordinate: number[], character: string) => {
    board[coordinate[0]][coordinate[1]] = character;
    drawBoard();
  };
  startBoard();
  return { updateBoard, drawBoard, startBoard };
})();

gameBoard.drawBoard();
