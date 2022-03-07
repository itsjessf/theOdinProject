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
const GameBoard = (() => {
    const board = [
        ["i", "i", "i"],
        ["i", "i", "i"],
        ["i", "i", "i"],
    ];
    const drawBoard = () => {
        const app = document.getElementById("game");
        for (const [yAxis, row] of board.entries()) {
            const p = document.createElement("p");
            app === null || app === void 0 ? void 0 : app.appendChild(p);
            for (const [xAxies, element] of row.entries()) {
                const button = document.createElement("button");
                button.textContent = element;
                button.addEventListener("click", function () {
                    updateBoard(yAxis, xAxies, "X");
                    winCon({ y: yAxis, x: xAxies });
                });
                p.appendChild(button);
            }
        }
    };
    const updateBoard = (y, x, character) => {
        var _a;
        if (cellIsPlayable(y, x)) {
            return;
        }
        board[y][x] = character;
        console.log(board);
        const nodes = (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.childNodes;
        if (nodes) {
            nodes[y + 2].childNodes[x].textContent = character;
        }
    };
    const cellIsPlayable = (y, x) => {
        if (board[y][x] != "i") {
            return true;
        }
        return false;
    };
    const cellHasCharacter = (y, x, char) => {
        if (board[y][x] == char) {
            return true;
        }
        return false;
    };
    const getBoardRow = (y) => {
        return board[y];
    };
    const getBoardColumn = (x) => {
        return [board[0][x], board[1][x], board[2][x]];
    };
    const winCon = (playedPos) => {
        //Horizontal and Vertical Wincon
        const boardRow = getBoardRow(playedPos.y);
        const boardColumn = getBoardColumn(playedPos.x);
        if (boardRow.every((val, i, arr) => val === arr[0]) ||
            boardColumn.every((val, i, arr) => val === arr[0])) {
            console.log("Thats a win");
        }
    };
    return { updateBoard, drawBoard, cellIsPlayable, cellHasCharacter, winCon };
})();
const computerSelection = () => {
    let randomY;
    let randomX;
    do {
        randomY = randomIntFromInterval(0, 2);
        randomX = randomIntFromInterval(0, 2);
    } while (GameBoard.cellIsPlayable(randomY, randomX) == true);
    GameBoard.updateBoard(randomY, randomX, "O");
    GameBoard.winCon({ y: randomY, x: randomX });
};
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function computerPlay() {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(computerSelection()), 3000);
        });
        yield promise;
    });
}
GameBoard.drawBoard();
computerPlay();
//to do : Game 
//to do : Check for vertical matches
