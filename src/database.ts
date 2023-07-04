import { TUsers } from "./types";
import { TProduct } from "./types";
import express, { Request, Response } from "express";
import cors from 'cors'

// Array de usuários
export const users: TUsers[] = [
  {
    id: 'u001',
    name: 'Fulano',
    email: 'fulano@email.com',
    password: 'fulano123',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u002',
    name: 'Beltrana',
    email: 'beltrana@email.com',
    password: 'beltrana00',
    createdAt: new Date().toISOString()
  },
];

// Array de produtos
export const products: TProduct[] = [
  {
    id: 'prod001',
    name: 'Mouse gamer',
    price: 250,
    description: 'Melhor mouse do mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
  {
    id: 'prod002',
    name: 'Monitor',
    price: 900,
    description: 'Monitor LED Full HD 24 polegadas',
    imageUrl: 'https://picsum.photos/seed/Monitor/400',
  },
];

// Função para criar um novo usuário
export function createTUser(
  id: string,
  name: string, 
  email: string,
  password: string
): string {
  const createdAt = new Date().toISOString();

  // Cria um novo objeto de usuário com os parâmetros fornecidos
  const newTUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt,
  };

  // Adiciona o novo usuário ao array de usuários existente
  users.push(newTUser);
  return "Cadastro realizado com sucesso";
}

// Função para buscar todos os usuários
export function getAllUsers(): TUsers[] {
  // Retorna o array de usuários completo
  return users;
}

// Função para criar um novo produto
export function createProduct(
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
): string {
  const newProduct: TProduct = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);
  return "Produto criado com sucesso";
}

// Função para buscar todos os produtos
export function getAllProducts(): TProduct[] {
  return products;
}

// Função para buscar os produtos pelo nome
export function searchProductsByName (name: string): TProduct[] {
  // Convertemos o termo de busca para minúsculas para tornar a busca case insensitive
  const searchTerm = name.toLowerCase()

  // Filtramos os produtos com base no nome, verificando se o nome do produto inclui o termo de busca (em minúsculas)
  const searchResults = products.filter((product) => 
  product.name.toLowerCase().includes(searchTerm)
  )
  // Retornamos os resultados da busca
  return searchResults;
}

const app = express()

// Configuração para lidar com o formato JSON nas requisições
app.use(express.json())
// Configuração para lidar com o CORS (Cross-Origin Resource Sharing)
app.use(cors())

// Inicialização do servidor na porta 3003
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003")
})

// Rota para obter todos os usuários
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users)
})

// Rota para obter todos os produtos, com opção de filtrar por nome
app.get("/products", (req: Request, res: Response) => {
  const nameToFind = req.query.name as string

  if (nameToFind) {
    const result: TProduct[] = products.filter(
      (product) => product.name.toLowerCase().includes(nameToFind.toLowerCase())
    )
    res.status(200).send(result)
    
  } else {
    res.status(200).send(products)
  }
})

// Rota para criar um novo usuário
app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string
  const name = req.body.name as string
  const email = req.body.email as string
  const password = req.body.password as string

  const result = createTUser(id, name, email, password)

  res.status(201).send(result)
})

// Rota para criar um novo produto
app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string
  const name = req.body.name as string
  const price = req.body.price as number
  const description = req.body.description as string
  const imageUrl = req.body.imageUrl as string

  const result = createProduct(id, name, price, description, imageUrl);

  res.status(201).send(result)
})

// Rota para deletar um usuário específico
app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id

  const userIndex = users.findIndex((user) => user.id === idToDelete)

  if (userIndex >= 0) {
    users.splice(userIndex, 1)
  }

  res.status(200).send("Usuário deletado com sucesso")
})

// Rota para deletar um produto específico
app.delete("/products/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id

  const productIndex = products.findIndex((product) => product.id === idToDelete)

  if (productIndex >= 0) {
    users.splice(productIndex, 1)
  }

  res.status(200).send("Produto deletado com sucesso")
})

// Rota para editar um produto específico
app.put("/products/:id", (req: Request, res: Response) => {
  const idToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined
  const newImageUrl = req.body.imageUrl as string | undefined

  const product = products.find((product) => product.id === idToEdit)

  if(product) {
    product.id = newId || product.id
    product.name = newName || product.name
    product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
    product.description = newDescription || product.description
    product.imageUrl = newImageUrl || product.imageUrl
  }

  res.status(200).send("Atualização realizada com sucesso")
})