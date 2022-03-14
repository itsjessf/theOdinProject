"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var PlayerTypes;
(function (PlayerTypes) {
    PlayerTypes["human"] = "X";
    PlayerTypes["computer"] = "O";
})(PlayerTypes || (PlayerTypes = {}));
const GameBoard = (() => {
    const initialState = {
        board: [
            ["i", "i", "i"],
            ["i", "i", "i"],
            ["i", "i", "i"],
        ],
        currentPlayer: PlayerTypes.human,
        gameIsFinished: false,
        winner: "No one",
    };
    let state = Object.assign({}, initialState);
    const restartGame = () => {
        console.log("The Game restarted");
        state = Object.assign({}, initialState);
        state.board = [
            ["i", "i", "i"],
            ["i", "i", "i"],
            ["i", "i", "i"],
        ];
    };
    const drawBoard = () => {
        var _a;
        const paragraph = (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.children;
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
    const playCell = (y, x, playerType) => {
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
    const isCellPlayable = (y, x) => {
        return state.board[y][x] == "i" ? true : false;
    };
    const winCon = (y, x) => {
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
        if (boardRow.every((val, i, arr) => val === arr[0]) ||
            boardColumn.every((val, i, arr) => val === arr[0])) {
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
                if (cell != "i") {
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
    const calculateWinner = (y, x) => {
        console.log("Thats a win");
        state.gameIsFinished = true;
        const character = state.board[y][x];
        PlayerTypes.human === character
            ? (state.winner = "Human")
            : (state.winner = "Computer");
        displayWinner();
    };
    const displayWinner = () => {
        const popUp = document.getElementById("popup");
        const blur = document.getElementById("blur");
        console.log(blur);
        const popUpChildren = popUp === null || popUp === void 0 ? void 0 : popUp.children;
        if (typeof popUp == "undefined" ||
            typeof popUpChildren == "undefined" ||
            typeof blur == "undefined") {
            console.log("yo the pop up doesnt exist");
            return;
        }
        popUpChildren[1].innerHTML = state.winner + "!";
        blur === null || blur === void 0 ? void 0 : blur.classList.toggle("active");
        popUp === null || popUp === void 0 ? void 0 : popUp.classList.toggle("active");
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
const computerSelection = () => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => {
        let randomY;
        let randomX;
        do {
            randomY = randomIntFromInterval(0, 2);
            randomX = randomIntFromInterval(0, 2);
        } while (GameBoard.isCellPlayable(randomY, randomX) == false);
        GameBoard.playCell(randomY, randomX, PlayerTypes.computer);
    }, randomIntFromInterval(10, 1000));
});
const playerSelection = (x, y) => {
    GameBoard.playCell(x, y, PlayerTypes.human);
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
                playerSelection(x, y);
                if (GameBoard.isGameFinished()) {
                    return;
                }
                computerSelection();
            }, { once: true });
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
    popUp === null || popUp === void 0 ? void 0 : popUp.classList.toggle("active");
    blur === null || blur === void 0 ? void 0 : blur.classList.toggle("active");
    Game();
}
const Game = () => {
    console.log("New Game");
    GameBoard.drawBoard();
    addEventListeners();
};
Game();
