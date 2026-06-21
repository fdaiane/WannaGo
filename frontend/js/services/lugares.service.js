import { lugaresApi } from '../api/lugares.api.js';

export const lugaresService = {
  async listar(filtros) {
    return lugaresApi.listar(filtros);
  },

  async criar(dadosFormulario) {
    // Normalização antes de enviar à API
    const dados = {
      nome: dadosFormulario.nome.trim(),
      pais: dadosFormulario.pais.trim(),
      status: dadosFormulario.status || 'sonho',
      imagemUrl: dadosFormulario.imagemUrl?.trim() || '',
    };

    if (dadosFormulario.categoriaId) {
      dados.categoriaId = Number(dadosFormulario.categoriaId);
    }

    return lugaresApi.criar(dados);
  },

  async atualizar(id, dados) {
    return lugaresApi.atualizar(id, dados);
  },

  async remover(id) {
    return lugaresApi.remover(id);
  },
};
