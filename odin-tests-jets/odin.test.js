const {capitalize, reverseString, calculator, analyseArray} = require("./odin");

test('computer_to_Computer', () => {
  expect(capitalize('computer')).toBe('Computer');
});

test('strings_not_allowed', () => {
  expect(capitalize('this is a sentence')).toBe(undefined);
})

test('abcd_to_dcba', ()=> {
  expect(reverseString('abcd')).toBe('dcba');
})

test('should_do_calculations', () => {
  expect(calculator.add(1,1)).toBe(2);
  expect(calculator.subtract(1,1)).toBe(0);
  expect(calculator.divide(2,2)).toBe(1);
  expect(calculator.multiply(5, 2)).toBe(10);
});

test('should_analyze_array ', () => {
  expect(analyseArray([1,8,3,4,2,6])).toMatchObject({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
});