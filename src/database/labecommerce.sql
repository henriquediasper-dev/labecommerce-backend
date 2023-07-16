-- Active: 1689006540435@@127.0.0.1@3306

-- Criação da tabela de usuários (users)

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

-- Inserção de registros na tabela de usuários (users)

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u003',
        'Henrique Dias',
        'henrique@example.com',
        'senha123',
        DATETIME('now')
    ), (
        'u004',
        'Crislayne Maria',
        'crislaynemaria@example.com',
        'senha456',
        DATETIME('now')
    ), (
        'u005',
        'Maria Leonor',
        'marialeonor@example.com',
        'senha789',
        DATETIME('now')
    );

-- Criação da tabela de produtos (products)

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

-- Inserção de registros na tabela de produtos (products)

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod003',
        'Monitor',
        900,
        'Monitor LED Full HD 24 polegadas',
        'https://picsum.photos/seed/Monitor/400'
    ), (
        'prod004',
        'Teclado',
        100,
        'Teclado Mecânico Retroiluminado',
        'https://picsum.photos/seed/Teclado/400'
    ), (
        'prod005',
        'Mouse',
        50,
        'Mouse Óptico Sem Fio',
        'https://picsum.photos/seed/Mouse/400'
    ), (
        'prod006',
        'Notebook',
        2000,
        'Notebook Core i7 16GB RAM',
        'https://picsum.photos/seed/Notebook/400'
    ), (
        'prod007',
        'Headset Gamer',
        150,
        'Headset Gamer com Microfone',
        'https://picsum.photos/seed/Headset/400'
    );

-- Consulta dos registros na tabela de usuários (users)

SELECT * FROM users;

-- Consulta dos registros na tabela de produtos (products)

SELECT * FROM products;

-- Busca todos os produtos que possuem o termo "gamer" em seu nome.

SELECT * FROM products WHERE name LIKE '%gamer%';

-- Cria uma nova pessoa na tabela users

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u006',
        'João do beck',
        'joao@example.com',
        'senha123',
        DATETIME('now')
    );

-- Cria um novo produto na tabela products

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod008',
        'Mouse Gamer',
        75,
        'Mouse gamer com DPI ajustável',
        'https://example.com/mouse.jpg'
    );

-- delete user por id

DELETE FROM users WHERE id = 'u001';

-- delete product por id

DELETE FROM products WHERE id = 'prod001';

-- edição de produto por id, neste caso a query edita todas as colunas do item

UPDATE products
SET
    name = 'Fone Gamer',
    price = 89.99,
    description = 'Fone de alta qualidade sonora',
    image_url = 'https://example.com/fone-de-ouvido.jpg'
WHERE id = 'prod008';

-- Cria a tabela de pedidos

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases;

-- criando pedidos para cada pessoa cadastrada

-- pedidos para Henrique Dias

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur001',
        'u003',
        420.00,
        '2023-07-12 10:30:00'
    );

-- pedidos para Crislayne Maria

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur002',
        'u004',
        760.00,
        '2023-07-12 11:50:00'
    );

-- pedidos para Maria Leonor

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur003',
        'u005',
        290.00,
        '2023-07-12 13:20:00'
    );

-- Alteração do preço total do pedido

-- diminuindo o preço total do pedido com id 'p001'

UPDATE purchases
SET
    total_price = total_price - 100.00
WHERE id = 'pur001';

-- aumentando o preço total do pedido com  o id 'p002'

UPDATE purchases
SET
    total_price = total_price + 220.00
WHERE id = 'pur002';

-- Seleciona os campos que serão retornados na consulta

SELECT
    purchases.id AS purchase_id,
    users.id AS buyer_id,
    users.name AS buyer_name,
    users.email AS buyer_email,
    purchases.total_price AS total_price,
    purchases.created_at AS created_at
FROM purchases
    JOIN users ON purchases.buyer = users.id
WHERE purchases.id = 'pur001';

-- Criação da tabela de relações entre produtos e pedidos (purchases_products)

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchase_products;

-- inserção de dados na tabela purchase_products

-- Compra 1: Pedido 'pur001' com os produtos 'prod003' (qt 2) e 'prod005' (qnt 1)

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur001', 'prod003', 2), ('pur001', 'prod005', 1);

-- Compra 2: Pedido 'pur002' com os produtos 'prod004' (qt 3) e 'prod006' (qt 1)

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur002', 'prod004', 3), ('pur002', 'prod006', 1);

-- Compra 3: Pedido 'pur003' com o produto 'prod005' (qt 4)

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur003', 'prod005', 4);

-- Consulta com INNER JOIN retornando todas as colunas das tabelas relacionadas (purchases_products, purchases e products)

-- SELECT *

-- FROM purchases_products

--     INNER JOIN purchases ON purchases_products.purchase_id = purchases.id

--     INNER JOIN products ON purchases_products.product_id = products.id

-- WHERE

--     purchases.id = purchases_products.purchase_id;

SELECT
    purchases_products.purchase_id,
    purchases_products.product_id,
    purchases_products.quantity,
    purchases.id AS purchase_id,
    purchases.buyer AS buyer_id,
    purchases.total_price,
    purchases.created_at AS purchase_created_at,
    products.id AS product_id,
    products.name AS product_name,
    products.price AS product_price,
    products.description AS product_description,
    products.image_url AS product_image_url
FROM purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;