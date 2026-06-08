import { LugarModel } from '../models/lugar.model.js';
import { CategoriaModel } from '../models/categoria.model.js';

const STATUS_VALIDOS = ['sonho', 'planejando', 'visitado'];

export const LugarService = {
  listar(filtros = {}) {
    return LugarModel.listar(filtros);
  },

  buscarPorId(id) {
    const lugar = LugarModel.buscarPorId(id);
    if (!lugar) {
      const err = new Error('Lugar não encontrado');
      err.status = 404;
      throw err;
    }
    return lugar;
  },

  criar(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      const err = new Error('O nome do lugar é obrigatório');
      err.status = 400;
      throw err;
    }
    if (!dados.pais || dados.pais.trim() === '') {
      const err = new Error('O país é obrigatório');
      err.status = 400;
      throw err;
    }

   
    if (dados.status && !STATUS_VALIDOS.includes(dados.status)) {
      const err = new Error(`Status inválido. Use: ${STATUS_VALIDOS.join(', ')}`);
      err.status = 400;
      throw err;
    }

    if (dados.categoriaId) {
      const categoria = CategoriaModel.buscarPorId(dados.categoriaId);
      if (!categoria) {
        const err = new Error('Categoria informada não existe');
        err.status = 400;
        throw err;
      }
    }

    if (!dados.status) dados.status = 'sonho';

    dados.nome = dados.nome.trim();
    dados.pais = dados.pais.trim();

    return LugarModel.inserir(dados);
  },

  atualizar(id, dados) {
    this.buscarPorId(id); 

    if (dados.status && !STATUS_VALIDOS.includes(dados.status)) {
      const err = new Error(`Status inválido. Use: ${STATUS_VALIDOS.join(', ')}`);
      err.status = 400;
      throw err;
    }

    if (dados.categoriaId) {
      const categoria = CategoriaModel.buscarPorId(dados.categoriaId);
      if (!categoria) {
        const err = new Error('Categoria informada não existe');
        err.status = 400;
        throw err;
      }
    }

    return LugarModel.atualizar(id, dados);
  },

  remover(id) {
    this.buscarPorId(id); 
    return LugarModel.remover(id);
  },
};
