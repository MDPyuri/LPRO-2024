//exemplo de objeto 
const randomNumber = Math.floor(Math.random() * 3);

const lookUpObjects = {
  1: 'Rock',
  2: 'Paper',
  3: 'Scissors',
};

const result = lookUpObjects[randomNumber];
console.log(randomNumber)
console.log(result);