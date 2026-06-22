import { apiRequest } from './client.js';

export const anotacoesApi = {
  listarPorLugar(lugarId) {
    return apiRequest(`/lugares/${lugarId}/anotacoes`);
  },

  criar(lugarId, dados) {
    return apiRequest(`/lugares/${lugarId}/anotacoes`, {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  remover(id) {
    return apiRequest(`/anotacoes/${id}`, {
      method: 'DELETE',
    });
  },
};
