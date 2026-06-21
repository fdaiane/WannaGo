import { UsuarioModel } from '../models/usuario.model.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const UsuarioService = {
  listar() {
    return UsuarioModel.listar();
  },

  buscarPorId(id) {
    const usuario = UsuarioModel.buscarPorId(id);
    if (!usuario) {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    }
    return usuario;
  },

  criar(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      const err = new Error('O nome do usuário é obrigatório');
      err.status = 400;
      throw err;
    }
    if (!dados.email || !EMAIL_REGEX.test(dados.email.trim())) {
      const err = new Error('Informe um e-mail válido');
      err.status = 400;
      throw err;
    }

    const email = dados.email.trim().toLowerCase();

    if (UsuarioModel.buscarPorEmail(email)) {
      const err = new Error('Já existe um usuário com esse e-mail');
      err.status = 409;
      throw err;
    }

    return UsuarioModel.inserir({ nome: dados.nome.trim(), email });
  },

  atualizar(id, dados) {
    this.buscarPorId(id); // lança 404 se não existir

    if (dados.email !== undefined) {
      if (!EMAIL_REGEX.test(dados.email.trim())) {
        const err = new Error('Informe um e-mail válido');
        err.status = 400;
        throw err;
      }
      dados.email = dados.email.trim().toLowerCase();

      const existente = UsuarioModel.buscarPorEmail(dados.email);
      if (existente && existente.id !== Number(id)) {
        const err = new Error('Já existe um usuário com esse e-mail');
        err.status = 409;
        throw err;
      }
    }

    if (dados.nome !== undefined) {
      if (dados.nome.trim() === '') {
        const err = new Error('O nome não pode ser vazio');
        err.status = 400;
        throw err;
      }
      dados.nome = dados.nome.trim();
    }

    return UsuarioModel.atualizar(id, dados);
  },

  remover(id) {
    this.buscarPorId(id); // lança 404 se não existir
    return UsuarioModel.remover(id);
  },
};
