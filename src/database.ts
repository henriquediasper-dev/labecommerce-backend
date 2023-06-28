import { TUsers } from "./types";
import { TProduct } from "./types";

// Array de usuários
export const users: TUsers[] = [
  {
    id: 'u001',
    name: 'Fulano',
    email: 'fulano@email.com',
    password: 'fulano123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'u002',
    name: 'Beltrana',
    email: 'beltrana@email.com',
    password: 'beltrana00',
    createdAt: new Date().toISOString(),
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
