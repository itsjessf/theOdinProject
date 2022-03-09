"use strict";
var PlayerTypes;
(function (PlayerTypes) {
    PlayerTypes["human"] = "X";
    PlayerTypes["computer"] = "O";
})(PlayerTypes || (PlayerTypes = {}));
const GameBoard = (() => {
    const board = [
        ["i", "i", "i"],
        ["i", "i", "i"],
        ["i", "i", "i"],
    ];
    let currentPlayer = PlayerTypes.human;
    let gameIsFinished = false;
    const drawBoard = () => {
        var _a;
        const paragraph = (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.children;
        if (typeof paragraph == "undefined") {
            console.log("yo app doesnt exist");
            return;
        }
        for (const [yAxis, row] of board.entries()) {
            for (const [xAxies, element] of row.entries()) {
                const button = paragraph[yAxis].children[xAxies];
                button.textContent = element;
            }
        }
    };
    const playCell = (y, x, playerType) => {
        if (!cellIsPlayable(y, x)) {
            console.log("Not a playable cell");
            return;
        }
        if (playerType !== currentPlayer) {
            console.log("You are not the current player");
            return;
        }
        board[y][x] = playerType;
        drawBoard();
        winCon({ y: y, x: x });
        if (isGameFinished()) {
            gameStats();
        }
        currentPlayer =
            currentPlayer === PlayerTypes.human
                ? PlayerTypes.computer
                : PlayerTypes.human;
    };
    const cellIsPlayable = (y, x) => {
        if (board[y][x] != "i") {
            return false;
        }
        return true;
    };
    const winCon = (playedPos) => {
        //Horizontal and Vertical Wincon
        const boardRow = board[playedPos.y];
        const boardColumn = [
            board[0][playedPos.x],
            board[1][playedPos.x],
            board[2][playedPos.x],
        ];
        if (boardRow.every((val, i, arr) => val === arr[0]) ||
            boardColumn.every((val, i, arr) => val === arr[0])) {
            console.log("Thats a win");
            gameIsFinished = true;
        }
        else {
            gameIsFinished = false;
        }
    };
    const isGameFinished = () => {
        return gameIsFinished === true ? true : false;
    };
    const gameStats = () => {
        console.log();
    };
    return { playCell, drawBoard, cellIsPlayable, winCon, isGameFinished };
})();
const computerSelection = () => {
    if (GameBoard.isGameFinished()) {
        return;
    }
    let randomY;
    let randomX;
    do {
        randomY = randomIntFromInterval(0, 2);
        randomX = randomIntFromInterval(0, 2);
    } while (GameBoard.cellIsPlayable(randomY, randomX) == false);
    console.log("Computer Played");
    GameBoard.playCell(randomY, randomX, PlayerTypes.computer);
};
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function addEventListeners() {
    var _a;
    const paragraph = (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.children;
    if (typeof paragraph == "undefined") {
        console.log("yo app doesnt exist");
        return;
    }
    for (let x = 0; x < paragraph.length; x++) {
        for (let y = 0; y < paragraph[x].children.length; y++) {
            const button = paragraph[x].children[y];
            button.addEventListener("click", function () {
                GameBoard.playCell(x, y, PlayerTypes.human);
                computerSelection();
            }, { once: true });
        }
    }
}
//to do : Game
const Game = () => {
    GameBoard.drawBoard();
    console.log("Player should play");
    addEventListeners();
};
Game();
//to do : Check for vertical matches
