const express = require('express'); // Importa o express
const app = express(); // Cria uma instância do express
const users =[
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
    { id: 3, name: 'Charlie', status: 'active' }
]

// GET localhost:3000/api/users
app.get('/api/users', (req, res) =>{
    //QUERY PARAMS
    console.log(req.query);

    // Extrai o status da requisição
    // localhost:3000/api/users?status=active
    const status = req.query.status;

    // Se o status foi informado, filtra os usuários pelo status
    if (status) {
        return res.status(200).json(users.filter(user => user.status === status));
    }

    // Se o status não foi informado, retorna todos os usuários
    return res.status(200).json(users);
});

// GET localhost:3000/api/users/1
app.get('/api/users/:id', (req, res) => {
    console.log(req.params);

    // Extrai o id da requisição
    const id = parseInt(req.params.id);

    // Verifica se o id é um número
    if(isNaN(id)) {
        return res.status(400).json({ error: 'O "id" do usuário deve ser um número.'});
    }

    // Busca o usuário pelo id
    const user = users.find(user => user.id === id);

    // Verifica se o usuário foi encontrado
    console.log(user);

    // Se o usuário não foi encontrado, retorna um erro
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado'});
    }

    // Se o usuário foi encontrado, retorna o usuário
    return res.status(200).json(user);
    
});

//Permite que a aplicação receba dados no formato JSON
app.use(express.json());

// POST localhost:3000/api/users
app.post('/api/users', (req, res) => {
    console.log(req.body);
    
    // Extrai o body da requisição
    const { body } = req;
    // Gerar um novo id para o usuário com base no último id da lista
    const id = users[users.length - 1].id + 1;
    // Adiciona o novo usuário ao array de usuários
    const newUser = { id, ...body };
    users.push(newUser);
    return res.status(201).json(newUser);

});

// PUT localhost:3000/api/users/1
app.delete("/api/users/:id", (req, res) => {
    // Extrai o id da requisição
    console.log(req.params);
    // Converte o id para um número inteiro
    const id = parseInt(req.params.id);
    // Busca o índice do usuário pelo id
    const index = users.findIndex(user => user.id === id);
    // Se o usuário não foi encontrado, retorna um erro
    if (index === -1) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Remove o usuário da lista de usuários
    users.splice(index, 1);
    // Retorna o status 204 No Content
    return res.status(200).json(users);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});
