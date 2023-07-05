import {
  users,
  products,
  createTUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct } from "./types";

// // Criando um novo usuário
// createTUser(
//   'u003',
//   'Ciclana',
//   'ciclana@email.com',
//   'ciclana00'
// );

// // Buscando todos os usuários
// const allUsers = getAllUsers();

// // Criando um novo produto
// const createProductResult = createProduct(
//     "prod003",
//     "SSD gamer",
//     349.99,
//     "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
//     "https://example.com/ssd-gamer.jpg"
//   );

// // Buscando todos os produtos
// const allProducts = getAllProducts();

// const searchResults = searchProductsByName("gamer");
// console.log('Resultados da busca', searchResults)

const app = express();

// Configuração para lidar com o formato JSON nas requisições
app.use(express.json());
// Configuração para lidar com o CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Inicialização do servidor na porta 3003
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Rota para obter todos os usuários
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro ao obter os usuários");
  }
});

// Rota para obter todos os produtos, com opção de filtrar por nome
app.get("/products", (req: Request, res: Response) => {
  try {
    // Obtém o query param "name" da requisição
    const nameToFind = req.query.name as string;

    // Verifica se o query param "name" existe e possui pelo menos um caractere
    if (typeof nameToFind === "string" && nameToFind.length > 0) {
      // Filtra os produtos com base no nome fornecido
      const result: TProduct[] = products.filter((product) =>
        product.name.toLowerCase().includes(nameToFind.toLowerCase())
      );

      // Verifica se houve algum produto encontrado
      if (result.length === 0) {
        // Caso não tenha encontrado nenhum produto, lança uma exceção com uma mensagem personalizada
        throw new Error("Nenhum produto encontrado com o nome especificado");
      }

      // Retorna os produtos filtrados
      res.status(200).send(result);
    } else {
      // Caso o query params não tenha sido fornecido ou não possua caracteres, retorna todos os produtos
      res.status(200).send(products);
    }
  } catch (error: any) {
    console.log(error);

    // Define o status da resposta como 500 se o status atual for 200
    if (res.statusCode === 200) {
      res.status(500);
    }

    // Envia a mensagem de erro como resposta
    res.send(error.message);

    // Lança uma exceção com uma mensagem genérica
    throw new Error("Erro ao obter os produtos");
  }
});

// Rota para criar um novo usuário
app.post("/users", (req: Request, res: Response) => {
  try {
    // Verifica se todas as propriedades esperadas existem no corpo da requisição
    if (
      !req.body.id ||
      !req.body.name ||
      !req.body.email ||
      !req.body.password
    ) {
      throw new Error("Dados incompletos do usuário");
    }

    // Extraindo as propriedades do corpo da requisição
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    // Verifica se já existe uma conta com o mesmo ID
    const existingUserWithId = users.find((user) => user.id === id);
    if (existingUserWithId) {
      throw new Error("Já existe uma conta com o mesmo ID");
    }

    // Verifica se já existe uma conta com o mesmo e-mail
    const existingUserWithEmail = users.find((user) => user.email === email);
    if (existingUserWithEmail) {
      throw new Error("Já existe uma conta com o mesmo e-mail");
    }

    // Cria um novo usuário
    const result = createTUser(id, name, email, password);

    res.status(201).send(result);
  } catch (error: any) {
    console.log(error);

    // Define o status da resposta como 400 se o status atual for 200
    if (res.statusCode === 200) {
      res.status(400);
    }

    // Envia a mensagem de erro como resposta
    res.send(error.message);
  }
});

// Rota para criar um novo produto
app.post("/products", (req: Request, res: Response) => {
  try {
    // Verifica se todas as propriedades esperadas existem no corpo da requisição
    if (
      typeof !req.body.id !== "string" ||
      typeof !req.body.name !== "string" ||
      typeof !req.body.price !== "string" ||
      typeof !req.body.description !== "string" ||
      typeof !req.body.imageUrl !== "string"
    ) {
      throw new Error("Dados incompletos do produto");
    }

    // Extraindo as propriedades do corpo da requisição
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

    // Verifica se já existe um produto com a mesma id
    const existingProduct = products.find((product) => product.id === id);
    if (existingProduct) {
      throw new Error("Já existe um produto com a mesma id");
    }

    // Cria um novo produto
    const result = createProduct(id, name, price, description, imageUrl);

    res.status(201).send(result);
  } catch (error: any) {
    console.log(error);

    // Define o status da resposta como 400 se o status atual for 200
    if (res.statusCode === 200) {
      res.status(400);
    }

    // Envia a mensagem de erro como resposta
    res.send(error.message);
  }
});

// Rota para deletar um usuário específico
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    // Procura o índice do usuário com base no ID fornecido na URL da requisição
    const idToDelete = req.params.id;

    // Procura o índice do usuário com base no id forncecido na URL da requisição
    const userIndex = users.findIndex((user) => user.id === idToDelete);

    // Verifica se o usuário foi encontrado
    if (userIndex === -1) {
      // Se não foi encontrado, lança uma exceção com a mensagem de erro
      throw new Error("Usuário não encontrado");
    }
    // Remove um usuário do array utilizando o métido splice
    users.splice(userIndex, 1);

    // Retorna uma resposta de sucesso
    res.status(200).send("Usuário deletado com sucesso");
  } catch (error: any) {
    console.log(error);

    // Define o status da resposta como 404 se o status atual for 200
    if (res.statusCode === 200) {
      res.status(404);
    }

    // Envia a mensagem de erro como resposta
    res.send(error.message);
  }
});

// Rota para deletar um produto específico
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    // Procura o índice do produto com base no ID fornecido na URL da requisição
    const idToDelete = req.params.id;

    const productIndex = products.findIndex(
      (product) => product.id === idToDelete
    );

    // Verifica se o produto foi encontrado
    if (productIndex === -1) {
      // Se não foi encontrado, lanla uma excessão com a mensagem de erro
      throw new Error("Produto não foi encontrado");
    }

    // Remove o produto do array utilizando o método splice
    users.splice(productIndex, 1);

    // Retorna uma resposta de sucesso
    res.status(200).send("Produto deletado com sucesso");
  } catch (error: any) {
    console.log(error);

    // Define o status da resposta como 404 se o status atual for 200
    if (res.statusCode === 200) {
      res.status(404);
    }

    // Envia a mensagem de erro como resposta
    res.send(error.message);
  }
});

// Rota para editar um produto específico
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = typeof req.body.id === "string" ? req.body.id : undefined;
    const newName =
      typeof req.body.name === "string" ? req.body.name : undefined;
    const newPrice =
      typeof req.body.price === "number" ? req.body.price : undefined;
    const newDescription =
      typeof req.body.description === "string"
        ? req.body.description
        : undefined;
    const newImageUrl =
      typeof req.body.imageUrl === "string" ? req.body.imageUrl : undefined;

    // Verifica se o produto existe antes de editá-lo
    const product = products.find((product) => product.id === idToEdit);

    if (!product) {
      // Se o produto não for encontrado, lança uma excessão com a mensagem de erro
      throw new Error("Produto não econtrado");
    }

    // Validando os dados opcionais do body se eles forem recebido
    if (newId !== undefined) {
      //Se o newId não for undefined, atualiza o id do produto
      product.id = newId;
    }

    if (newName !== undefined) {
      // Se newName não for undefined, atualiza nome do produto
      product.name = newName;
    }

    if (newPrice !== undefined && !isNaN(newPrice)) {
      // Se o newPrice não for undefined e não for NaN, atualiza o preço do produto
      product.price = newPrice;
    }

    if (newDescription !== undefined) {
      // Se o newDescription não for undefined, atualiza a descrição do produto
      product.description = newDescription;
    }

    if (newImageUrl !== undefined) {
      // Se o newImageUrl não for undefined, atualiza a URL da imagem do produto
      product.imageUrl = newImageUrl;
    }

    // Retorna uma resposta de sucesso
    res.status(200).send("Atualização realizada com sucesso");
  } catch (error: any) {
    console.log(error);

    // Define o status da resposta como 404 se o status atual for 200
    if (res.statusCode === 200) {
      res.status(404);
    }

    // Envia a mensagem de erro como resposta
    res.send(error.message);
  }
});
