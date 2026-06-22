import { usuariosApi } from '../api/usuarios.api.js';

export const usuariosService = {
  async listar() {
    return usuariosApi.listar();
  },

  async criar(dadosFormulario) {
    const dados = {
      nome: dadosFormulario.nome.trim(),
      email: dadosFormulario.email.trim(),
    };
    return usuariosApi.criar(dados);
  },

  async remover(id) {
    return usuariosApi.remover(id);
  },
};
