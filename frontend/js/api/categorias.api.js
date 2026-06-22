import { apiRequest } from './client.js';

export const categoriasApi = {
  listar() {
    return apiRequest('/categorias');
  },
};
