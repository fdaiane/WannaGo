import { AnotacaoService } from '../services/anotacao.service.js';

export const AnotacaoController = {
  // GET /api/lugares/:lugarId/anotacoes
  listarPorLugar(req, res, next) {
    try {
      res.json(AnotacaoService.listarPorLugar(req.params.lugarId));
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      res.json(AnotacaoService.buscarPorId(req.params.id));
    } catch (err) {
      next(err);
    }
  },

  // POST /api/lugares/:lugarId/anotacoes
  criar(req, res, next) {
    try {
      const nova = AnotacaoService.criar(req.params.lugarId, req.body);
      res.status(201).json(nova);
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      res.json(AnotacaoService.atualizar(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  },

  remover(req, res, next) {
    try {
      AnotacaoService.remover(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
