// exemplo de operador ternário
//exemplo com 2 cenários possíveis
let n = 7;

let result = n % 2 === 0 ? 'par' : 'ímpar';

//exemplo com 3 cenários possíveis
let randomNumber = Math.floor(Math.random() * 3);
result = randomNumber === 0 ? 'Rock' : randomNumber === 1 ? 'Paper' : 'Scissors';
console.log(result);