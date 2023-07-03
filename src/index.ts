import { users, products, createTUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";

// Criando um novo usuário
createTUser(
  'u003',
  'Ciclana',
  'ciclana@email.com',
  'ciclana00'
);

// Buscando todos os usuários
const allUsers = getAllUsers();

// Criando um novo produto
const createProductResult = createProduct(
    "prod003",
    "SSD gamer",
    349.99,
    "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
    "https://example.com/ssd-gamer.jpg"
  );
  
// Buscando todos os produtos
const allProducts = getAllProducts();
  
const searchResults = searchProductsByName("gamer");
console.log('Resultados da busca', searchResults)

