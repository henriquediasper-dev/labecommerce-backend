# API de Gerenciamento de Usuários e Produtos

Essa é uma API desenvolvida usando o framework Express.js para gerenciar usuários, produtos e pedidos em um sistema de comércio eletrônico. A API oferece rotas para criar, listar, atualizar e excluir usuários, produtos e pedidos.

## 1. Instalação

### 1.1 Clone o repositório:

comando: git clone https://github.com/seu-usuario/nome-do-repositorio.git

comando: cd nome-do-repositorio

### 1.2 Instale as dependências:

comando: npm install

### 1.3 Configurar o banco de dados:

Antes de executar o projeto, é essencial configurar corretamente o banco de dados para garantir que as operações de armazenamento e recuperação de dados funcionem corretamente. Neste projeto, utilizamos o Knex.js, que é um construtor de consultas SQL para Node.js, para realizar as operações de banco de dados.

Siga os passos abaixo para configurar o banco de dados:

1.3.1 Certifique-se de ter o SQLite instalado em sua máquina ou ambiente de desenvolvimento. O SQLite é o banco de dados que utilizaremos neste projeto.

1.3.2 Com o banco de dados instalado, o próximo passo é criar um arquivo de banco de dados SQLite. No projeto, o arquivo labecommerce.db será criado automaticamente na pasta src/database, conforme configurado no arquivo knex.ts.

1.3.3 No arquivo knex.ts, você encontrará as configurações de conexão do Knex.js para o SQLite. Essas configurações incluem o caminho para o arquivo do banco de dados e algumas opções específicas.

Exemplo de configuração do banco de dados no arquivo knex.ts: 

// src/database/knex.ts

import { knex } from "knex";

export const db = knex({
  client: "sqlite3", 
  connection: {
    filename: "./src/database/labecommerce.db",
  },
  useNullAsDefault: true, 
  pool: {
    min: 0, 
    max: 1, 
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    }, 
  },
});


Com as configurações do banco de dados devidamente definidas, o projeto estará pronto para se conectar ao SQLite e realizar as operações de CRUD (Create, Read, Update, Delete) necessárias para os usuários, produtos e pedidos.

Certifique-se de seguir corretamente essas etapas antes de iniciar o servidor. Isso garantirá que todas as interações com o banco de dados sejam executadas corretamente e que o servidor funcione sem problemas.

Observação: O Knex.js suporta vários outros bancos de dados, além do SQLite. Se você optar por usar um banco de dados diferente, certifique-se de verificar as configurações específicas do cliente para o banco de dados que está utilizando.

## 2. Executando o servidor

### 2.1 Para iniciar o servidor, utilize o seguinte comando:

comando: npm start

obs: O servidor estará disponível em http://localhost:3003.

## 3. Rotas disponíveis

### 3.1 Usuários:

- GET /users: Retorna todos os usuários cadastrados no sistema.
- POST /users: Cria um novo usuário com os dados fornecidos no corpo da requisição.
- DELETE /users/:id: Deleta o usuário com o ID especificado na URL da requisição.

### 3.2 Produtos:

- GET /products: Retorna todos os produtos cadastrados no sistema. Possui a opção de filtrar por nome usando o query param name.
- POST /products: Cria um novo produto com os dados fornecidos no corpo da requisição.
- DELETE /products/:id: Deleta o produto com o ID especificado na URL da requisição.
- PUT /products/:id: Atualiza os dados do produto com o ID especificado na URL da requisição.

### 3.3 Pedidos:

- GET /purchases: Retorna todos os pedidos cadastrados no sistema.
- GET /purchases/:id: Retorna os detalhes de um pedido específico com base no ID fornecido na URL da requisição.
- POST /purchases: Cria um novo pedido com os dados fornecidos no corpo da requisição.
- DELETE /purchases/:id: Deleta o pedido com o ID especificado na URL da requisição.

## 4. Formato dos dados

### 4.1 Usuários:

{
"id": "string",
"name": "string",
"email": "string",
"password": "string",
"created_at": "string"
}

### 4.2 Produtos:

{
"id": "string",
"name": "string",
"price": "number",
"description": "string",
"image_url": "string"
}

### 4.3 Pedidos:

{
"id": "string",
"buyer": "string",
"products": [
{
"id": "string",
"quantity": "number"
}
],
"total_price": "number",
"created_at": "string"
}

### link para documentação: https://documenter.getpostman.com/view/27681059/2s93zH2eD6
