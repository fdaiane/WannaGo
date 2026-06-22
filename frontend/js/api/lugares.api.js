import { apiRequest } from './client.js';

export const lugaresApi = {
  listar(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.status) params.set('status', filtros.status);
    if (filtros.categoriaId) params.set('categoriaId', filtros.categoriaId);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest(`/lugares${query}`);
  },

  criar(dados) {
    return apiRequest('/lugares', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  atualizar(id, dados) {
    return apiRequest(`/lugares/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  remover(id) {
    return apiRequest(`/lugares/${id}`, {
      method: 'DELETE',
    });
  },
};
