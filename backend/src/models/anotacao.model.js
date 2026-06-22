import { db } from '../db.js';

// converte a linha do banco (snake_case) para o formato da API (camelCase)
function paraApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    texto: row.texto,
    dataCriacao: row.data_criacao,
    lugarId: row.lugar_id,
  };
}

export const AnotacaoModel = {
  listarPorLugar(lugarId) {
    const rows = db.prepare('SELECT * FROM anotacoes WHERE lugar_id = ? ORDER BY data_criacao DESC')
      .all(Number(lugarId));
    return rows.map(paraApi);
  },

  buscarPorId(id) {
    const row = db.prepare('SELECT * FROM anotacoes WHERE id = ?').get(Number(id));
    return paraApi(row);
  },

  inserir({ texto, lugarId }) {
    const dataCriacao = new Date().toISOString();
    const r = db.prepare(
      'INSERT INTO anotacoes (texto, data_criacao, lugar_id) VALUES (?, ?, ?)'
    ).run(texto, dataCriacao, Number(lugarId));
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE anotacoes SET texto = ? WHERE id = ?').run(novo.texto, Number(id));
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM anotacoes WHERE id = ?').run(Number(id));
    return r.changes > 0;
  },
};
