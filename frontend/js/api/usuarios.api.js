import { apiRequest } from './client.js';

export const usuariosApi = {
  listar() {
    return apiRequest('/usuarios');
  },

  criar(dados) {
    return apiRequest('/usuarios', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  remover(id) {
    return apiRequest(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  },
};
