import { StatusModel } from '../models/status.model.js';

export const StatusService = {
  listar() {
    return StatusModel.listar();
  },

  buscarPorId(id) {
    const status = StatusModel.buscarPorId(id);
    if (!status) {
      const err = new Error('Status não encontrado');
      err.status = 404;
      throw err;
    }
    return status;
  },

  criar(dados) {
    if (!dados.descricao || dados.descricao.trim() === '') {
      const err = new Error('A descrição do status é obrigatória');
      err.status = 400;
      throw err;
    }

    const descricao = dados.descricao.trim().toLowerCase();

    if (StatusModel.buscarPorDescricao(descricao)) {
      const err = new Error('Já existe um status com essa descrição');
      err.status = 409;
      throw err;
    }

    return StatusModel.inserir({ descricao });
  },

  atualizar(id, dados) {
    this.buscarPorId(id); // lança 404 se não existir

    if (dados.descricao !== undefined) {
      if (dados.descricao.trim() === '') {
        const err = new Error('A descrição do status não pode ser vazia');
        err.status = 400;
        throw err;
      }
      dados.descricao = dados.descricao.trim().toLowerCase();
    }

    return StatusModel.atualizar(id, dados);
  },

  remover(id) {
    this.buscarPorId(id); // lança 404 se não existir
    return StatusModel.remover(id);
  },
};
