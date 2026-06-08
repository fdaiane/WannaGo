import { CategoriaModel } from '../models/categoria.model.js';

export const CategoriaService = {
  listar() {
    return CategoriaModel.listar();
  },

  buscarPorId(id) {
    const categoria = CategoriaModel.buscarPorId(id);
    if (!categoria) {
      const err = new Error('Categoria não encontrada');
      err.status = 404;
      throw err;
    }
    return categoria;
  },

  criar(dados) {

    if (!dados.nome || dados.nome.trim() === '') {
      const err = new Error('O nome da categoria é obrigatório');
      err.status = 400;
      throw err;
    }

    dados.nome = dados.nome.trim();
    dados.nome = dados.nome.charAt(0).toUpperCase() + dados.nome.slice(1);

    return CategoriaModel.inserir(dados);
  },

  atualizar(id, dados) {
    this.buscarPorId(id); 

    if (dados.nome !== undefined) {
      if (dados.nome.trim() === '') {
        const err = new Error('O nome da categoria não pode ser vazio');
        err.status = 400;
        throw err;
      }
      dados.nome = dados.nome.trim();
      dados.nome = dados.nome.charAt(0).toUpperCase() + dados.nome.slice(1);
    }

    return CategoriaModel.atualizar(id, dados);
  },

  remover(id) {
    this.buscarPorId(id); 
    return CategoriaModel.remover(id);
  },
};
