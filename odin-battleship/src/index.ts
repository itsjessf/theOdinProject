enum ShipLengths {
  carrier = 5,
  battleship = 4,
  cruiser = 3,
  submarine = 3,
  destroyer = 2,
}

interface Ship {
  hit: (value: number) => void;
  getShipLength: () => number;
  isSunk: () => boolean;
}

function Ship(shipType: ShipLengths): Ship {
  let shipArray: Array<number | string> = Array.from(Array(shipType).keys());
  let sunk: boolean = false;

  const hit = (value: number) => {
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
  let gameGrid: Array<string>[];

  const initGameGrid = () => {
    for (let i = 0; i < 10; i++) {
      for (let x = 0; x < 10; x++) {
        gameGrid[i][x] = ".";
      }
    }
  };

  const placeShip = (coordinate: { y: number; x: number }, ship: Ship) => {
    const shipLength = ship.getShipLength();
    if (!isShipPlaceable(coordinate, shipLength)) {
      return;
    }
    for (let i = 0; i < shipLength; i++) {
      gameGrid[coordinate.y][coordinate.x + i] = "x";
    }
  };

  const isShipPlaceable = (
    coordinate: { y: number; x: number },
    length: number
  ) => {
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
