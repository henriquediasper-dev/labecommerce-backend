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

-- Consulta dos registros na tabela de usuários (users)

SELECT * FROM users;

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
        'Headset',
        150,
        'Headset Gamer com Microfone',
        'https://picsum.photos/seed/Headset/400'
    );

-- Consulta dos registros na tabela de produtos (products)

SELECT * FROM products;