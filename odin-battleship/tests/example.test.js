const {Ship, GameBoard} = require("../src/index");


test('when all positions are hit, isSunk returns true ', () => {
  let testShip = Ship(3);
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
});

test('when not all positions are hit, isSunk returns false ', () => {
  let testShip = Ship(3);
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.isSunk()).toBe(false);
});

test('should return length ', () => {
  let testShip = Ship(3);
  expect(testShip.getShipLength()).toBe(3);
});