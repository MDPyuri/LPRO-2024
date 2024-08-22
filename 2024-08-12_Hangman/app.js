const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

//definindo as variáveis inicias
const animals = ["dog", "cat", "fish", "bird", "rabbit", "cow", "horse", "pig", "goat", "sheep"];
let lifes = 6;
let attempts = 0;


//função que escolhe um animal aleatório utilizando a função Math.random
function pickAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}
const animal = pickAnimal();

//função que pega as letras do animal escolhido
function pickLetters() {
  return animal.split("");
}

while (lifes > 0) {
  console.log("Digite uma letra");
  function letter() {
    app.get("/letra", (req, res) => {
      res.send("Digite uma letra");
      const letter = req.body;
      res.json(letter);
    });
  }
  if (animal.includes(letter())) {
    console.log("Acertou!");
  } else {
    console.log("Errou!");
    lifes--;
  }
  attempts++;
}

console.log("total de vidas", lifes);
console.log("animal selecionado", animal);
console.log("letras do animal", pickLetters());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});