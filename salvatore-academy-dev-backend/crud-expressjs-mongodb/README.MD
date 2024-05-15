# CRUD Express.js em Memória

Este é um exemplo de aplicativo CRUD (Create, Read, Update, Delete) usando o framework Express.js e um banco de dados em memória.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina.

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Uso

1. Inicie o servidor:

    ```bash
    npm start
    ```

2. Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação.

## Rotas

- `GET /api/usuarios`: Retorna todos os usuários cadastrados.
- `GET /api/usuarios/:id`: Retorna um usuário específico pelo ID.
- `POST /api/usuarios`: Cria um novo usuário.
- `PUT /api/usuarios/:id`: Atualiza um usuário existente pelo ID.
- `DELETE /api/usuarios/:id`: Exclui um usuário pelo ID.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).