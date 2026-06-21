import { DatabaseSync } from 'node:sqlite';


export const db = new DatabaseSync('banco.db');


db.exec('PRAGMA foreign_keys = ON;');


db.exec(`
  CREATE TABLE IF NOT EXISTS categorias (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS lugares (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    nome         TEXT NOT NULL,
    pais         TEXT NOT NULL,
    status       TEXT NOT NULL,
    imagem_url   TEXT,
    categoria_id INTEGER,
    criado_em    TEXT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  );
`);

// popula categorias padrão na primeira execução (idempotente)
const existemCategorias = db.prepare('SELECT 1 FROM categorias LIMIT 1').get();
if (!existemCategorias) {
  const inserir = db.prepare('INSERT INTO categorias (nome) VALUES (?)');
  ['Praia', 'Cidade', 'Natureza', 'Cultural'].forEach((nome) => inserir.run(nome));
}
