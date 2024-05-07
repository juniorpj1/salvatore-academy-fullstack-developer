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

// Endpoint Read Single [GET]
app.get('/personagem/:id', (req, res) => {
  // Acessar o id que foi passado na URL  
  const id = req.params.id;
  
  // Buscar o personagem na lista
  const item = lista.find(item => item.id == id);

  // Retornar o personagem encontrado
  res.send(item);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});