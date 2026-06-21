import { LugarModel } from '../models/lugar.model.js';
import { CategoriaModel } from '../models/categoria.model.js';
import { StatusModel } from '../models/status.model.js';
import { UsuarioModel } from '../models/usuario.model.js';

const STATUS_PADRAO = 'sonho';

// resolve o statusId a partir de `dados.statusId` (número) OU `dados.status` (texto, ex: "sonho")
function resolverStatusId(dados, { obrigatorio }) {
  if (dados.statusId) {
    const status = StatusModel.buscarPorId(dados.statusId);
    if (!status) {
      const err = new Error('Status informado não existe');
      err.status = 400;
      throw err;
    }
    return status.id;
  }

  if (dados.status) {
    const status = StatusModel.buscarPorDescricao(dados.status);
    if (!status) {
      const err = new Error(`Status inválido: ${dados.status}`);
      err.status = 400;
      throw err;
    }
    return status.id;
  }

  if (obrigatorio) return null; // o chamador decide o padrão
  return undefined; // não informado em uma atualização parcial
}

export const LugarService = {
  listar(filtros = {}) {
    const filtrosModel = {
      categoriaId: filtros.categoriaId,
      usuarioId: filtros.usuarioId,
    };

    if (filtros.status) {
      const status = StatusModel.buscarPorDescricao(filtros.status);
      filtrosModel.statusId = status ? status.id : -1; // -1 garante lista vazia se status inválido
    }
    if (filtros.statusId) {
      filtrosModel.statusId = filtros.statusId;
    }

    return LugarModel.listar(filtrosModel);
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
    // Validações obrigatórias
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

    // Regra de negócio: categoria deve existir se informada
    if (dados.categoriaId) {
      const categoria = CategoriaModel.buscarPorId(dados.categoriaId);
      if (!categoria) {
        const err = new Error('Categoria informada não existe');
        err.status = 400;
        throw err;
      }
    }

    // Regra de negócio: usuário deve existir se informado
    if (dados.usuarioId) {
      const usuario = UsuarioModel.buscarPorId(dados.usuarioId);
      if (!usuario) {
        const err = new Error('Usuário informado não existe');
        err.status = 400;
        throw err;
      }
    }

    // Status: usa o informado, ou cai no padrão "sonho"
    let statusId = resolverStatusId(dados, { obrigatorio: true });
    if (!statusId) {
      statusId = StatusModel.buscarPorDescricao(STATUS_PADRAO).id;
    }

    dados.nome = dados.nome.trim();
    dados.pais = dados.pais.trim();
    dados.statusId = statusId;

    return LugarModel.inserir(dados);
  },

  atualizar(id, dados) {
    this.buscarPorId(id); // lança 404 se não existir

    if (dados.categoriaId) {
      const categoria = CategoriaModel.buscarPorId(dados.categoriaId);
      if (!categoria) {
        const err = new Error('Categoria informada não existe');
        err.status = 400;
        throw err;
      }
    }

    if (dados.usuarioId) {
      const usuario = UsuarioModel.buscarPorId(dados.usuarioId);
      if (!usuario) {
        const err = new Error('Usuário informado não existe');
        err.status = 400;
        throw err;
      }
    }

    const statusId = resolverStatusId(dados, { obrigatorio: false });
    if (statusId !== undefined) {
      dados.statusId = statusId;
    }

    return LugarModel.atualizar(id, dados);
  },

  remover(id) {
    this.buscarPorId(id); // lança 404 se não existir
    return LugarModel.remover(id);
  },
};
