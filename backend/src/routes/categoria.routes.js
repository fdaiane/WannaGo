import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller.js';

const router = Router();

router.get('/',        CategoriaController.listar);
router.get('/:id',     CategoriaController.buscarPorId);
router.post('/',       CategoriaController.criar);
router.put('/:id',     CategoriaController.atualizar);
router.delete('/:id',  CategoriaController.remover);

export default router;
