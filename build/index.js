"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createTUser)('u003', 'Ciclana', 'ciclana@email.com', 'ciclana00');
const allUsers = (0, database_1.getAllUsers)();
const createProductResult = (0, database_1.createProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://example.com/ssd-gamer.jpg");
const allProducts = (0, database_1.getAllProducts)();
const searchResults = (0, database_1.searchProductsByName)("gamer");
console.log('Resultados da busca', searchResults);
//# sourceMappingURL=index.js.map