"use strict";
var ShipLengths;
(function (ShipLengths) {
    ShipLengths[ShipLengths["carrier"] = 5] = "carrier";
    ShipLengths[ShipLengths["battleship"] = 4] = "battleship";
    ShipLengths[ShipLengths["cruiser"] = 3] = "cruiser";
    ShipLengths[ShipLengths["submarine"] = 3] = "submarine";
    ShipLengths[ShipLengths["destroyer"] = 2] = "destroyer";
})(ShipLengths || (ShipLengths = {}));
function Ship(shipType) {
    let shipArray = Array.from(Array(shipType).keys());
    let sunk = false;
    const hit = (value) => {
        if (value > shipArray.length) {
            return;
        }
        shipArray[value] = "x";
        if (checkIfShipSank()) {
            sunk = true;
        }
    };
    const checkIfShipSank = () => {
        return shipArray.every((val, i, arr) => val === arr[0]);
    };
    const isSunk = () => {
        return sunk;
    };
    const getShipLength = () => {
        return shipArray.length;
    };
    return { isSunk, hit, getShipLength };
}
function GameBoard() {
    let gameGrid;
    const initGameGrid = () => {
        for (let i = 0; i < 10; i++) {
            for (let x = 0; x < 10; x++) {
                gameGrid[i][x] = ".";
            }
        }
    };
    const placeShip = (coordinate, ship) => {
        const shipLength = ship.getShipLength();
        if (!isShipPlaceable(coordinate, shipLength)) {
            return;
        }
        for (let i = 0; i < shipLength; i++) {
            gameGrid[coordinate.y][coordinate.x + i] = "x";
        }
    };
    const isShipPlaceable = (coordinate, length) => {
        if (gameGrid[coordinate.y][coordinate.x + length] == undefined) {
            //Game board is out of bounds
            return false;
        }
        //If there is a ship at the location
        for (let i = 0; i < length; i++) {
            if (gameGrid[coordinate.y][coordinate.x + i] == "x") {
                return false;
            }
        }
        return true;
    };
}
module.exports = { Ship, GameBoard };
