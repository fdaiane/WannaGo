import { StatusService } from '../services/status.service.js';

export const StatusController = {
  listar(req, res, next) {
    try {
      res.json(StatusService.listar());
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      res.json(StatusService.buscarPorId(req.params.id));
    } catch (err) {
      next(err);
    }
  },

  criar(req, res, next) {
    try {
      const novo = StatusService.criar(req.body);
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      res.json(StatusService.atualizar(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  },

  remover(req, res, next) {
    try {
      StatusService.remover(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
