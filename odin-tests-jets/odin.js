function capitalize(word) {
  if (word.includes(" ")) {
    return;
  }
  const lowerCaseWord = word.toLowerCase();
  return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
}

function reverseString(word) {
  let reversedWord = [];
  for (let i = 0; i < word.length; i++) {
    reversedWord.push(word[word.length - (i + 1)]);
  }
  return reversedWord.join("");
}

const calculator = {
  add: (a, b) => {
    return a + b;
  },

  subtract: (a, b) => {
    return a - b;
  },

  multiply: (a, b) => {
    return a * b;
  },

  divide: (a, b) => {
    return a / b;
  },
};

function analyseArray(values) {
  let analisedArray = {};
  const arraySum = values.reduce((accumulator, currentNumber) => accumulator + currentNumber);
  const average = arraySum/values.length;
  let smallestNumber= Number.MAX_SAFE_INTEGER;
  let biggestNumber = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < values.length; i++) {
    if(values[i] < smallestNumber){
      smallestNumber = values[i];
    }
    if(values[i] > biggestNumber){
      biggestNumber = values[i]
    }
  }

  return {
    average: average,
    min: smallestNumber,
    max: biggestNumber,
    length: values.length
  }
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  analyseArray,
};
