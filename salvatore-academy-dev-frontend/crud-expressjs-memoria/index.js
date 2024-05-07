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

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});