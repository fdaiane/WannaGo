import { UsuarioService } from '../services/usuario.service.js';

export const UsuarioController = {
  listar(req, res, next) {
    try {
      res.json(UsuarioService.listar());
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      res.json(UsuarioService.buscarPorId(req.params.id));
    } catch (err) {
      next(err);
    }
  },

  criar(req, res, next) {
    try {
      const novo = UsuarioService.criar(req.body);
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      res.json(UsuarioService.atualizar(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  },

  remover(req, res, next) {
    try {
      UsuarioService.remover(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
