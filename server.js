// server.js
const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Certifique-se de ter o CORS importado

const app = express();
const port = 3000;
const secretKey = 'mysecretkey';  // Mantenha uma chave secreta para o JWT

// CORS - permita a origem do seu frontend
app.use(cors({
  origin: 'http://localhost:8100',  // Permite que o frontend do Ionic acesse o backend
  methods: ['GET', 'POST'],  // Permite os métodos que você irá usar
  allowedHeaders: ['Content-Type', 'Authorization']  // Permite os cabeçalhos necessários
}));

app.use(bodyParser.json());  // Middleware para processar JSON no corpo das requisições

// Simulando um banco de dados (em um projeto real, você usaria um banco de dados de verdade)
let users = [];  // Armazena usuários com nome e senha criptografada

// Função para gerar o JWT
function generateToken(user) {
  const payload = { username: user.username };
  return jwt.encode(payload, secretKey);
}

// Endpoint de cadastro (register)
app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Verifica se o usuário já existe
    if (users.some(user => user.username === username)) {
      return res.status(400).send('Usuário já existe');
    }
  
    // Criptografa a senha
    const hashedPassword = bcrypt.hashSync(password, 8);  // Gera o hash da senha
  
    // Simula o armazenamento do usuário (em um banco real, isso seria salvo em um banco de dados)
    users.push({ username, password: hashedPassword });
  
    // Mensagem confirmando o sucesso
    res.status(201).send({ message: 'Cadastro bem-sucedido!' });
  });
  

// Endpoint de login (login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário existe
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send('Usuário não encontrado');
  }

  // Verifica se a senha está correta
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send('Senha incorreta');
  }

  // Gera o token JWT
  const token = generateToken(user);

  res.json({ token });  // Retorna o token JWT para o frontend
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
