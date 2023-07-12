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
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

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