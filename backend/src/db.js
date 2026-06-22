import { DatabaseSync } from 'node:sqlite';


export const db = new DatabaseSync('banco.db');


db.exec('PRAGMA foreign_keys = ON;');


db.exec(`
  CREATE TABLE IF NOT EXISTS categorias (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS status (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS usuarios (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS lugares (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    nome         TEXT NOT NULL,
    pais         TEXT NOT NULL,
    status_id    INTEGER NOT NULL,
    imagem_url   TEXT,
    categoria_id INTEGER,
    usuario_id   INTEGER,
    criado_em    TEXT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (status_id)    REFERENCES status(id),
    FOREIGN KEY (usuario_id)   REFERENCES usuarios(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS anotacoes (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    texto        TEXT NOT NULL,
    data_criacao TEXT NOT NULL,
    lugar_id     INTEGER NOT NULL,
    FOREIGN KEY (lugar_id) REFERENCES lugares(id) ON DELETE CASCADE
  );
`);


const existemCategorias = db.prepare('SELECT 1 FROM categorias LIMIT 1').get();
if (!existemCategorias) {
  const inserir = db.prepare('INSERT INTO categorias (nome) VALUES (?)');
  ['Praia', 'Cidade', 'Natureza', 'Cultural'].forEach((nome) => inserir.run(nome));
}


const existeStatus = db.prepare('SELECT 1 FROM status LIMIT 1').get();
if (!existeStatus) {
  const inserir = db.prepare('INSERT INTO status (descricao) VALUES (?)');
  ['sonho', 'planejando', 'visitado'].forEach((descricao) => inserir.run(descricao));
}
