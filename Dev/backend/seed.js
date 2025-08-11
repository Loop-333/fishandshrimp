const db = require('./db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS fish (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL,
      size INTEGER,
      description TEXT,
      category TEXT,
      imageUrl TEXT
    )
  `);

  db.run(`
    INSERT INTO fish (name, price, stock, size, description, category, imageUrl) VALUES
        ('Betta Splendens', 7.99, 15, 6, 'Peixe tropical colorido e agressivo com outros machos. Ideal para aquários pequenos.', 'Tropical', 'https://example.com/images/betta.png'),
        ('Neon Tetra', 1.50, 50, 3, 'Pequeno peixe de cardume com brilho azul e vermelho. Pacífico e fácil de cuidar.', 'Tropical', 'https://example.com/images/tetra.png'),
        ('Corydora Albina', 2.80, 30, 5, 'Peixe de fundo pacífico que ajuda na limpeza do aquário. Ideal em grupos.', 'Limpeza', 'https://example.com/images/corydora_albina.png')
  `);

    db.run(`
    INSERT INTO fish (name, price, stock, size, description, category, imageUrl) VALUES
        ('Camarão Blue Dream', 3.50, 20, 2, 'Camarão ornamental de água doce com coloração azul intensa. Pacífico e ótimo para aquários plantados.', 'Camarao', 'https://example.com/images/blue_dream.jpg'),
        ('Camarão Yellow Neon', 3.80, 18, 2, 'Camarão amarelo vibrante, ideal para aquários comunitários. Ajuda na limpeza de algas.', 'Camarao', 'https://example.com/images/yellow_neon.jpg');

    `);

  console.log('Database seeded.');
});
