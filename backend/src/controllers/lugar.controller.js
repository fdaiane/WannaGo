import { LugarService } from '../services/lugar.service.js';

export const LugarController = {
  listar(req, res, next) {
    try {
      // Suporte a filtros por query string: ?status=sonho&categoriaId=1&usuarioId=1
      const { status, statusId, categoriaId, usuarioId } = req.query;
      const lugares = LugarService.listar({ status, statusId, categoriaId, usuarioId });
      res.json(lugares);
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      const lugar = LugarService.buscarPorId(req.params.id);
      res.json(lugar);
    } catch (err) {
      next(err);
    }
  },

  criar(req, res, next) {
    try {
      const novo = LugarService.criar(req.body);
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      const atualizado = LugarService.atualizar(req.params.id, req.body);
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  remover(req, res, next) {
    try {
      LugarService.remover(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
