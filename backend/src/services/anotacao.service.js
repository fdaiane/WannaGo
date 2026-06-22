import { AnotacaoModel } from '../models/anotacao.model.js';
import { LugarModel } from '../models/lugar.model.js';

export const AnotacaoService = {
  listarPorLugar(lugarId) {
    // SRP: garantir que o lugar existe é responsabilidade do service,
    // não do model
    const lugar = LugarModel.buscarPorId(lugarId);
    if (!lugar) {
      const err = new Error('Lugar não encontrado');
      err.status = 404;
      throw err;
    }
    return AnotacaoModel.listarPorLugar(lugarId);
  },

  buscarPorId(id) {
    const anotacao = AnotacaoModel.buscarPorId(id);
    if (!anotacao) {
      const err = new Error('Anotação não encontrada');
      err.status = 404;
      throw err;
    }
    return anotacao;
  },

  criar(lugarId, dados) {
    const lugar = LugarModel.buscarPorId(lugarId);
    if (!lugar) {
      const err = new Error('Lugar não encontrado');
      err.status = 422;
      throw err;
    }

    if (!dados.texto || dados.texto.trim() === '') {
      const err = new Error('O texto da anotação é obrigatório');
      err.status = 400;
      throw err;
    }

    return AnotacaoModel.inserir({ texto: dados.texto.trim(), lugarId });
  },

  atualizar(id, dados) {
    this.buscarPorId(id); // lança 404 se não existir

    if (!dados.texto || dados.texto.trim() === '') {
      const err = new Error('O texto da anotação não pode ser vazio');
      err.status = 400;
      throw err;
    }

    return AnotacaoModel.atualizar(id, { texto: dados.texto.trim() });
  },

  remover(id) {
    this.buscarPorId(id); // lança 404 se não existir
    return AnotacaoModel.remover(id);
  },
};
