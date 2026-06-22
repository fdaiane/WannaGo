import { db } from '../db.js';

// converte a linha do banco (snake_case + status_id) para o formato da API
function paraApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    nome: row.nome,
    pais: row.pais,
    status: row.status_descricao ?? null,   // texto do status, via JOIN
    statusId: row.status_id,
    imagemUrl: row.imagem_url,
    categoriaId: row.categoria_id,
    usuarioId: row.usuario_id,
    criadoEm: row.criado_em,
  };
}

// SELECT com JOIN em status para devolver a descrição (ex: "sonho") pronta pro front
const SELECT_BASE = `
  SELECT lugares.*, status.descricao AS status_descricao
  FROM lugares
  JOIN status ON status.id = lugares.status_id
`;

export const LugarModel = {
  listar(filtros = {}) {
    let sql = SELECT_BASE + ' WHERE 1=1';
    const params = [];

    if (filtros.statusId) {
      sql += ' AND lugares.status_id = ?';
      params.push(Number(filtros.statusId));
    }
    if (filtros.categoriaId) {
      sql += ' AND lugares.categoria_id = ?';
      params.push(Number(filtros.categoriaId));
    }
    if (filtros.usuarioId) {
      sql += ' AND lugares.usuario_id = ?';
      params.push(Number(filtros.usuarioId));
    }

    const rows = db.prepare(sql).all(...params);
    return rows.map(paraApi);
  },

  buscarPorId(id) {
    const row = db.prepare(SELECT_BASE + ' WHERE lugares.id = ?').get(Number(id));
    return paraApi(row);
  },

  inserir({ nome, pais, statusId, imagemUrl, categoriaId, usuarioId }) {
    const criadoEm = new Date().toISOString();
    const r = db.prepare(
      `INSERT INTO lugares (nome, pais, status_id, imagem_url, categoria_id, usuario_id, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(
      nome,
      pais,
      Number(statusId),
      imagemUrl ?? null,
      categoriaId ? Number(categoriaId) : null,
      usuarioId ? Number(usuarioId) : null,
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
       SET nome = ?, pais = ?, status_id = ?, imagem_url = ?, categoria_id = ?, usuario_id = ?
       WHERE id = ?`
    ).run(
      novo.nome,
      novo.pais,
      Number(novo.statusId),
      novo.imagemUrl ?? null,
      novo.categoriaId ? Number(novo.categoriaId) : null,
      novo.usuarioId ? Number(novo.usuarioId) : null,
      Number(id)
    );
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM lugares WHERE id = ?').run(Number(id));
    return r.changes > 0;
  },
};
