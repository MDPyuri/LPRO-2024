//gere uma API utilizando o express com as seguintes expecificações: 
//Serev para controle de produtos
//deve conter as seguintes rotas
//POST /produto - cadastra um novo produto
//DELETE /produto/:id - deleta um produto pelo id
//GET /produto - retorna todos os produtos
//GET /produto/:id - retorna um produto pelo id
//PUT /produto/:id - atualiza um produto pelo id
// PATCH Atualizar o preço de um produto com base no seu ID com o objetivo de aplicar uma redução de X% no seu preço.
// PATCH Atualizar o estoque de um produto com base no seu ID com o objetivo de reduzir ou aumentar o seu estoque em X.
// Permitir que o usuário crie filtros que podem ser usados em conjunto, exemplo: o nome deve conter a palavra “Mouse”, o preço deve ser menor do que R$ 200 e a média das notas de avaliação acima de 4,5.
//Permitir que o usuário escolha uma coluna para realizar a ordenação de forma ascendente ou descendente
// Todas as rotas devem definir definir um código de status para as respostas (método res.status())
//Todas as rotas devem tratar casos de exceção ( try/catch/finally ) e retorno no formato JSON contendo uma mensagem  que explica o motivo do erro)
//criAR UM MIDLEWARE para registrar as chamadas realizadas a API no console
//o middleware a seguir deve ser usado em todas as rotas
//const loggingMiddleware = (req, res, next) => {
  //console.log(`${req.method} - ${req.url}`);
  //next();
  //};
  //app.use(loggingMiddleware);
  //
 // Criar um segundo Middleware responsável por extrair um produto com base no seu ID do array de produtos
//Caso não encontre, o Middleware não deve seguir com o fluxo normal do programa, mas sim encerrar lançando um erro com código de status adequado e um JSON com a mensagem explicando o motivo
//pronto para começar?
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
app.use(loggingMiddleware);
let produtos = [];
const findProduct = (id) => {
    const product = produtos.find((product) => product.id === id);
    if (!product) {
        throw new Error('Produto não encontrado');
    }
    return product;
};

// crie um segundo middleware responsável por extrair um produto com base no seu ID do array de produtos
// caso não encontre, o middleware não deve seguir com o fluxo normal do programa, mas sim encerrar lançando um erro com código de status adequado e um JSON com a mensagem explicando o motivo
const extractProduct = (req, res, next) => {
    const { id } = req.params;
    try {
        const product = findProduct(id);
        req.product = product;
        next();
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
app.post('/produto', (req, res) => {
    const { id, nome, preco, estoque } = req.body;
    const product = { id, nome, preco, estoque };
    produtos.push(product);
    res.status(201).json(product);
});
app.delete('/produto/:id', extractProduct, (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex((product) => product.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
    }
    produtos.splice(index, 1);
    res.status(204).send();
});
app.get('/produto', (req, res) => {
    res.json(produtos);
});
app.get('/produto/:id', extractProduct, (req, res) => {
    try {
        const { id } = req.params;
        const product = findProduct(id);
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
app.put('/produto/:id', extractProduct, (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, estoque } = req.body;
        const product = findProduct(id);
        product.nome = nome;
        product.preco = preco;
        product.estoque = estoque;
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
app.patch('/produto/:id', extractProduct,  (req, res) => {
    try {
        const { id } = req.params;
        const { preco } = req.body;
        const product = findProduct(id);
        product.preco = preco;
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
app.patch('/produto/:id/estoque', extractProduct, (req, res) => {
    try {
        const { id } = req.params;
        const { estoque } = req.body;
        const product = findProduct(id);
        product.estoque = estoque;
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});









