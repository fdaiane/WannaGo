import { CategoriaService } from '../services/categoria.service.js';

export const CategoriaController = {
  listar(req, res, next) {
    try {
      const categorias = CategoriaService.listar();
      res.json(categorias);
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      const categoria = CategoriaService.buscarPorId(req.params.id);
      res.json(categoria);
    } catch (err) {
      next(err);
    }
  },

  criar(req, res, next) {
    try {
      const nova = CategoriaService.criar(req.body);
      res.status(201).json(nova);
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      const atualizada = CategoriaService.atualizar(req.params.id, req.body);
      res.json(atualizada);
    } catch (err) {
      next(err);
    }
  },

  remover(req, res, next) {
    try {
      CategoriaService.remover(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
