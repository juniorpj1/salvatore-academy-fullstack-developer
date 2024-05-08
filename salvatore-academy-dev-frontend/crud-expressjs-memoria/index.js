const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

const lista = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'José' },
];

// Endpoint Read All [GET]
app.get('/personagem', (req, res) => {
   res.send(lista); // o express já transforma uma variável em JSON
});

// Endpoint Read Single by ID [GET]
app.get('/personagem/:id', (req, res) => {
  // Acessar o id que foi passado na URL  
  const id = req.params.id;
  
  // Buscar o personagem na lista
  const item = lista.find(item => item.id == id);

  // Retornar o personagem encontrado
  res.send(item);
});

// Endpoint Create [POST] /personagem
app.use(express.json()); // Middleware para o express entender JSON
app.post('/personagem', (req, res) => {
    // Receber os dados do novo personagem
    const personagem = req.body;

    // Adicionar o novo personagem na lista
    lista.push(personagem);

    // Retornar o novo personagem
    res.send('Personagem adicionado com sucesso ' + personagem.nome);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});