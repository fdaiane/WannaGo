import { Router } from 'express';
import { StatusController } from '../controllers/status.controller.js';

const router = Router();

router.get('/',        StatusController.listar);
router.get('/:id',     StatusController.buscarPorId);
router.post('/',       StatusController.criar);
router.put('/:id',     StatusController.atualizar);
router.delete('/:id',  StatusController.remover);

export default router;
