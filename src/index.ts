import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct } from "./types";
import { db } from "./database/knex";

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
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro ao obter os usuários");
  }
});

// Rota para obter todos os produtos, com opção de filtrar por nome
app.get("/products", async (req: Request, res: Response) => {
  try {
    // Obtém o query param "name" da requisição
    const nameToFind = req.query.name as string;

    // Verifica se o query param "name" existe e possui pelo menos um caractere
    if (typeof nameToFind === "string" && nameToFind.length > 0) {
      // Filtra os produtos com base no nome fornecido
      const result = await db("products").where(
        "name",
        "LIKE",
        "%${nameToFind}%"
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
      const products = await db("products");
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
app.post("/users", async (req: Request, res: Response) => {
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
    const [existingUserWithId] = await db("users").where("id", id);
    if (existingUserWithId) {
      throw new Error("Já existe uma conta com o mesmo ID");
    }

    // Verifica se já existe uma conta com o mesmo e-mail
    const [existingUserWithEmail] = await db("users").where("email", email);
    if (existingUserWithEmail) {
      throw new Error("Já existe uma conta com o mesmo e-mail");
    }

    // Cria um novo usuário

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
      created_at: new Date().toISOString(),
    };

    await db("users").insert(newUser);

    res.status(201).send("Usuário criado com sucesso");
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
app.post("/products", async (req: Request, res: Response) => {
  try {
    // Verifica se todas as propriedades esperadas existem no corpo da requisição
    if (
      typeof req.body.id !== "string" ||
      typeof req.body.name !== "string" ||
      typeof req.body.price !== "string" ||
      typeof req.body.description !== "string" ||
      typeof req.body.imageUrl !== "string"
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

    const [existingProductWithId] = await db("products").where("id", id);
    if (existingProductWithId) {
      throw new Error("Já existe um produto com a mesma id");
    }

    // Cria um novo produto

    const newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: imageUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
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
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    // Procura o ID do usuário com base no parâmetro fornecido na URL da requisição
    const idToDelete = req.params.id;

    // Verifica se o usuário existe no banco de dados
    const [userExisting] = await db("users").where("id", idToDelete);

    // Verifica se o usuário foi encontrado
    if (!userExisting) {
      // Se não foi encontrado, lança uma exceção com a mensagem de erro
      throw new Error("Usuário não encontrado");
    }
    // Remove um usuário do array utilizando o métido splice
    await db("users").del().where("id", idToDelete);

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
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    // Procura o índice do produto com base no ID fornecido na URL da requisição
    const idToDelete = req.params.id;

    const [productExisting] = await db("products").where("id", idToDelete);
    // Verifica se o produto foi encontrado
    if (!productExisting) {
      // Se não foi encontrado, lança uma excessão com a mensagem de erro
      throw new Error("Produto não foi encontrado");
    }

    // Remove o produto do banco de dados
    await db("products").del().where("id", idToDelete);

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
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id; // Obtém o ID do produto a ser editado a partir dos parâmetros da rota

    const { id, name, price, description, imageUrl } = req.body; // Obtém as novas informações do produto a partir do corpo da requisição

    // Verifica se o produto existe antes de editá-lo
    const [existingProduct] = await db("products").where("id", idToEdit);

    if (!existingProduct) {
      // Se o produto não for encontrado, lança uma excessão com a mensagem de erro
      throw new Error("Produto não econtrado");
    }

    const updateFields: Partial<TProduct> = {}; // array para armazenar as cláusulas SET da consulta de atualização

    // Verifica se cada nova informação do produto foi fornecida e, se sim, adiciona a cláusula SET correspondente ao array
    if (id !== undefined) {
      //Se o newId não for undefined, atualiza o id do produto
      updateFields.id = id;
    }

    if (name !== undefined) {
      // Se o name não for undefined, atualiza o nome do produto
      updateFields.name = name;
    }

    if (price !== undefined && !isNaN(price)) {
      // Se o price não for undefined e não for NaN, atualiza o preço do produto
      updateFields.price = price;
    }

    if (description !== undefined) {
      // Se o description não for undefined, atualiza a descrição do produto
      updateFields.description = description;
    }

    if (imageUrl !== undefined) {
      // Se o imageUrl não for undefined, atualiza a URL da imagem do produto
      updateFields.imageUrl = imageUrl;
    }

    // Verifica se algum campo para atualizar foi fornecido
    if (Object.keys(updateFields).length === 0) {
      throw new Error("Nenhum campo para atualizar fornecido");
    }
    console.log(updateFields);

    // Executa a consulta de atualização do produto no banco de dados usando as cláusulas SET acumuladas
    await db("products").where("id", idToEdit).update(updateFields);

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

// Rota para obter todos os pedidos
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db("purchases");
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro ao obter os pedidos");
  }
});

// Rota para criar um novo pedido
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    // Extrai os dados recebidos na requisição
    const id = req.body.id;
    const buyer = req.body.buyer;
    const products = req.body.products;

    // Verifica se o 'id' é uma string, se não for, retorna um erro 400
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' precisa ser uma string");
    }
    // Verifica se o 'buyer' é uma string, se não for, retorna um erro 400
    if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("'buyer' precisa ser uma string");
    }

    // Verifica se já existe um pedido com o mesmo 'id', se sim, retorna um erro 400
    const [purchase] = await db("purchases").where({ id });

    if (purchase) {
      res.status(400);
      throw new Error("Pedido já existe");
    }

    // Inicializa um array vazio para guardar os produtos do pedido
    const resultProducts = [];

    // Inicializa o valor total do pedido como 0
    let totalPrice = 0;

    // Percorre a lista de produtos do pedido
    for (let prod of products) {
      // Busca o produto no banco de dados usando o 'id' do produto
      const [product] = await db("products").where({ id: prod.id });

      if (!product) {
        res.status(400);
        throw new Error(`${prod.id} não encontrado`);
      }

      // Adiciona o produto à lista de produtos do pedido, incluindo a quantidade desejada
      resultProducts.push({ ...product, quantity: prod.quantity });
    }

    // Calcula o preço total do pedido somando o preço de cada produto multiplicado pela quantidade
    for (let product of resultProducts) {
      totalPrice += product.price * product.quantity;
    }

    // Cria um novo objeto com os dados do pedido
    const newPurchase = {
      id,
      buyer,
      total_price: totalPrice,
      created_at: new Date().toISOString(),
    };
    // Insere o novo pedido no banco de dados
    await db("purchases").insert(newPurchase);

    // Para cada produto do pedido, cria um novo objeto com os dados do relacionamento
    // entre o pedido e o produto, e insere no banco de dados na tabela "purchases_products"
    for (let product of products) {
      const newPurchaseProducts = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };

      await db("purchases_products").insert(newPurchaseProducts);
    }

    // Se tudo ocorrer bem, envia uma resposta com o status 201 (Criado) e uma mensagem de sucesso
    res.status(201).send("Pedido realizado com sucesso");
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

// Rota para obter a compra pelo seu id
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    // Consulta para obter os detalhes da compra
    const purchase = await db("purchases")
      .join("users", "purchases.buyer", "=", "users.id")
      .select(
        "purchases.id as purchaseId",
        "purchases.buyer as buyerId",
        "users.name as buyerName",
        "users.email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt"
      )
      .where("purchases.id", purchaseId)
      .first();

    if (!purchase) {
      return res.status(404).send("Compra não encontrada");
    }

    // Consulta para obter os produtos relacionados à compra
    const products = await db("products")
      .join(
        "purchases_products",
        "products.id",
        "=",
        "purchases_products.product_id"
      )
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url as imageUrl",
        "purchases_products.quantity"
      )
      .where("purchases_products.purchase_id", purchaseId);

    // Formatação dos dados da compra e produtos em um objeto
    const formattedPurchase = {
      purchaseId: purchase.purchaseId,
      buyerId: purchase.buyerId,
      buyerName: purchase.buyerName,
      buyerEmail: purchase.buyerEmail,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      products: products,
    };

    // Envio da resposta com o objeto formatado
    res.status(200).send(formattedPurchase);
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Erro ao obter a compra");
  }
});

// Rota para deletar um pedido pelo seu id
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    // Verifica se a compra existe antes de excluí-la
    const [existingPurchase] = await db("purchases").where({ id: idToDelete });
    if (!existingPurchase) {
      res.status(404);
      throw new Error("Compra não encontrada");
    }

    // Executa a consulta de exclusão no banco de dados
    await db("purchases").del().where({ id: idToDelete });

    res.status(200).send({ message: "Compra excluída com sucesso" });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
