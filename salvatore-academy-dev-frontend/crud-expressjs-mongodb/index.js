const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

// Conexão com o banco de dados
const uri = 'mongodb://localhost:27017';
const dbName = 'crud-expressjs-mongodb';

// Função para conectar ao banco de dados
async function main() {
  // Conectar ao banco de dados
  const client = new MongoClient(uri);
  console.log('Conectando ao banco de dados...');
  await client.connect()
  console.log('Conectado ao banco de dados');

  // Selecionar o banco de dados
  const db = client.db(dbName);

  // Selecionar a coleção
  const collection = db.collection('personagem');

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

  // Endpoint Read All [GET] /personagem 
  app.get('/personagem', async (req, res) => {
    // Buscar todos os personagens
    const personagens = await collection.find().toArray();

    // Retornar a lista de personagens com try catch
    try {
      res.send(personagens);
    } catch (error) {
      res.status(500).send('Erro ao buscar personagens');
    }
  });

  // Endpoint Read Single by ID [GET]
  app.get('/personagem/:id', async (req, res) => {
    // Acessar o id que foi passado na URL  
    const id = req.params.id;

    // Checar se o personagem existe na collection do MongoDB
    const item = await collection.findOne({ _id: new ObjectId(id)});

    // Checar se o personagem existe
    if (!item) {
      res.status(404).send('Personagem não encontrado');
      return;
    }
    
    // Retornar o personagem encontrado
    res.send(item);
  });

  // Endpoint Create [POST] /personagem
  app.use(express.json()); // Middleware para o express entender JSON
  app.post('/personagem', async (req, res) => {
    // Receber os dados do novo personagem
    const personagem = req.body;

    // validar os dados e não permitir personagens duplicados pelo nome e id (não pode ser repetido)
    const item = lista.find(item => item.id == personagem.id || item.nome == personagem.nome);

    //if (item) {
    //  res.status(409).send('Personagem já existe');
    //  return;
    //}

    // Checar se o personagem tem nome
    if (!personagem.nome || !personagem) {
      res.status(400).send('Nome e corpo da requisição é obrigatório');
      return;
    }

    // Adicionar o novo personagem na collection do MongoDB
    await collection.insertOne(personagem);

    // Retornar o novo personagem e status code de created (201)
    res.status(201).send(personagem);
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
      res.status(404).send('Personagem não encontrado');
      return;
    }

    // Buscar o personagem na lista
    const item = lista.find(function (item) {
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

    // Checar se o personagem existe
    const itemExistente = lista.find(item => item.id == id);
    if (!itemExistente) {
      res.status(404).send('Personagem não encontrado');
      return;
    }

    // Buscar o personagem na lista
    const index = lista.findIndex(function (item) {
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

}

// Iniciar a aplicação
main();