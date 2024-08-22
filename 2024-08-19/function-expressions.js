//anonymous functions

//v1
const multiplicar = function(a, b) {
    return a * b;
}

//v2
const somar = function(a, b) { return a + b; }

//chamada das funções
somar(2, 3); // 5 chama a função somar, mas não faz nada com o retorno

let numero1 = 2;
let numero2 = 3;
let resultado = multiplicar(numero1, numero2);
console.log(resultado); // 6