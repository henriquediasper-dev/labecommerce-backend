# API de Gerenciamento de Usuários e Produtos

Essa é uma API desenvolvida usando o framework Express.js para gerenciar usuários, produtos e pedidos em um sistema de comércio eletrônico. A API oferece rotas para criar, listar, atualizar e excluir usuários, produtos e pedidos.

## 1. Instalação

### 1.1 Clone o repositório:

comando: git clone https://github.com/seu-usuario/nome-do-repositorio.git

comando: cd nome-do-repositorio

### 1.2 Instale as dependências:

comando: npm install

### 1.3 Configure o banco de dados:

Certifique-se de configurar corretamente o banco de dados, pois o projeto usa o Knex.js para realizar as operações de banco de dados. Você pode configurar as credenciais de conexão no arquivo database/knex.js.

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
