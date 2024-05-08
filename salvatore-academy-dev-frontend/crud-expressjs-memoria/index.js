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

    // Gerar um novo id para o personagem
    const id = lista[lista.length - 1].id + 1;
    personagem.id = id;

    // validar os dados e não permitir personagens duplicados pelo nome e id (não pode ser repetido)
    const item = lista.find(item => item.id == personagem.id || item.nome == personagem.nome);
    
    if (item) {
        res.status(400).send('Personagem já existe');
        return;
    }

    // Checar se o personagem tem nome
    if (!personagem.nome) {
        res.status(400).send('Nome é obrigatório');
        return;
    }

    // Adicionar o novo personagem na lista
    lista.push(personagem);

    // Retornar o novo personagem
    res.send('Personagem adicionado com sucesso: ' + personagem.nome);
});

// Endpoint Update [PUT] /personagem/:id
app.put('/personagem/:id', (req, res) => {
    // Acessar o id que foi passado na URL  
    const id = req.params.id;

    // Checar se o personagem tem nome
    if (!req.body.nome) {
        res.status(400).send('Nome é obrigatório');
        return;
    }

    // Checar se o personagem existe
    const itemExistente = lista.find(item => item.id == id);
    if (!itemExistente) {
        res.status(400).send('Personagem não encontrado');
        return;
    }
    
    // Buscar o personagem na lista
    const item = lista.find(function(item) {
         return item.id == id; 
    });

    // Atualizar o personagem com os dados do body
    item.nome = req.body.nome;

    // Retornar o personagem atualizado
    res.send('Personagem atualizado com sucesso: ' + item.id + ' - ' + item.nome);
});

// Endpoint Delete [DELETE] /personagem/:id
app.delete('/personagem/:id', (req, res) => {
    // Acessar o id que foi passado na URL  
    const id = req.params.id;
    
    // Buscar o personagem na lista
    const index = lista.findIndex(function(item) {
         return item.id == id; 
    });

    // Remover o personagem da lista
    lista.splice(index, 1); // Remove 1 elemento a partir do index

    // Retornar o personagem removido
    res.send('Personagem removido com sucesso');
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});