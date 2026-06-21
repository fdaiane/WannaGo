
import { db } from '../db.js';

function paraApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    nome: row.nome,
    pais: row.pais,
    status: row.status,
    imagemUrl: row.imagem_url,
    categoriaId: row.categoria_id,
    criadoEm: row.criado_em,
  };
}

export const LugarModel = {
  listar(filtros = {}) {
    let sql = 'SELECT * FROM lugares WHERE 1=1';
    const params = [];

    if (filtros.status) {
      sql += ' AND status = ?';
      params.push(filtros.status);
    }
    if (filtros.categoriaId) {
      sql += ' AND categoria_id = ?';
      params.push(Number(filtros.categoriaId));
    }

    const rows = db.prepare(sql).all(...params);
    return rows.map(paraApi);
  },

  buscarPorId(id) {
    const row = db.prepare('SELECT * FROM lugares WHERE id = ?').get(Number(id));
    return paraApi(row) || null;
  },

  inserir({ nome, pais, status, imagemUrl, categoriaId }) {
    const criadoEm = new Date().toISOString();
    const r = db.prepare(
      `INSERT INTO lugares (nome, pais, status, imagem_url, categoria_id, criado_em)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      nome,
      pais,
      status,
      imagemUrl ?? null,
      categoriaId ? Number(categoriaId) : null,
      criadoEm
    );
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;

    const novo = { ...atual, ...dados };
    db.prepare(
      `UPDATE lugares
       SET nome = ?, pais = ?, status = ?, imagem_url = ?, categoria_id = ?
       WHERE id = ?`
    ).run(
      novo.nome,
      novo.pais,
      novo.status,
      novo.imagemUrl ?? null,
      novo.categoriaId ? Number(novo.categoriaId) : null,
      Number(id)
    );
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM lugares WHERE id = ?').run(Number(id));
    return r.changes > 0;
  },
};

