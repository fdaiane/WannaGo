import { db } from '../db.js';

export const UsuarioModel = {
  listar() {
    return db.prepare('SELECT * FROM usuarios').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(Number(id)) || null;
  },

  buscarPorEmail(email) {
    return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email) || null;
  },

  inserir({ nome, email }) {
    const r = db.prepare('INSERT INTO usuarios (nome, email) VALUES (?, ?)').run(nome, email);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?')
      .run(novo.nome, novo.email, Number(id));
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM usuarios WHERE id = ?').run(Number(id));
    return r.changes > 0;
  },
};
