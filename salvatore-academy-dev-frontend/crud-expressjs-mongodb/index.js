const express = require('express');
const { MongoClient, ObjectId, Collection } = require('mongodb');

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
  app.put('/personagem/:id', async (req, res) => {
    // Checar se o personagem existe
    //const itemExistente = lista.find(item => item.id == id);
    //if (!itemExistente) {
    //  res.status(404).send('Personagem não encontrado');
    //  return;
    //}

    // Acessar o body da requisição
    const novoItem = req.body;

    // Checar se o personagem tem nome ou se o novoItem existe
    if (!novoItem.nome || !novoItem) {
      res.status(400).send('Nome e corpo da requisição é obrigatório');
      return;
    }

    // Buscar o personagem na collection pelo ID
    const id = req.params.id;

    // Atualizar na collection o novoItem pelo ID
    await collection.updateOne(
      { _id: new ObjectId(id)}, 
      { $set: novoItem }
    );

    // Retornar o personagem atualizado
    res.send(novoItem);
  });

  // Endpoint Delete [DELETE] /personagem/:id
  app.delete('/personagem/:id', async (req, res) => {
    // Acessar o id que foi passado na URL  
    const id = req.params.id;

    // Checar se o personagem existe
    if (id == null || id == undefined) {
      res.status(404).send('Personagem não encontrado');
      return;
    }

    // Remover o personagem da collection pelo ID usando
    await collection.deleteOne({ _id: new ObjectId(id)});

    // Retornar a mensagem de personagem removido com sucesso
    res.send('Personagem removido com sucesso' + id);
  });


  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

}

// Iniciar a aplicação
main();