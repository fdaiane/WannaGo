import { categoriasApi } from '../api/categorias.api.js';

export const categoriasService = {
  async listar() {
    return categoriasApi.listar();
  },
};
