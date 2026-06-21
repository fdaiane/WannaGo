import { db } from '../db.js';

export const StatusModel = {
  listar() {
    return db.prepare('SELECT * FROM status').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM status WHERE id = ?').get(Number(id)) || null;
  },

  buscarPorDescricao(descricao) {
    return db.prepare('SELECT * FROM status WHERE descricao = ?').get(descricao) || null;
  },

  inserir({ descricao }) {
    const r = db.prepare('INSERT INTO status (descricao) VALUES (?)').run(descricao);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE status SET descricao = ? WHERE id = ?').run(novo.descricao, Number(id));
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM status WHERE id = ?').run(Number(id));
    return r.changes > 0;
  },
};
