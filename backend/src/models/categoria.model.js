import { db } from '../db.js';

export const CategoriaModel = {
  listar() {
    return db.prepare('SELECT * FROM categorias').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM categorias WHERE id = ?').get(Number(id)) || null;
  },

  inserir({ nome }) {
    const r = db.prepare('INSERT INTO categorias (nome) VALUES (?)').run(nome);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE categorias SET nome = ? WHERE id = ?').run(novo.nome, Number(id));
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM categorias WHERE id = ?').run(Number(id));
    return r.changes > 0;
  },
};