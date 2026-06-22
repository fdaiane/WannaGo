import { anotacoesApi } from '../api/anotacoes.api.js';

export const anotacoesService = {
  async listarPorLugar(lugarId) {
    return anotacoesApi.listarPorLugar(lugarId);
  },

  async criar(lugarId, texto) {
    return anotacoesApi.criar(lugarId, { texto: texto.trim() });
  },

  async remover(id) {
    return anotacoesApi.remover(id);
  },
};
