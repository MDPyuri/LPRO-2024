//exemplo de switch case
let computer = drawPlay();
console.log(computer);

const drawPlay = () => {
  const randomNumber = Math.floor(Math.random() * 3);

  let result = '';

switch (randomNumber) {
  case 0:
    result = 'Rock';
    break;
  case 1:
    result = 'Paper';
    break;
  default:
    result = 'Scissors';
}
return result;
}

console.log(drawPlay());