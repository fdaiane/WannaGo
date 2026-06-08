import { Router } from 'express';
import { LugarController } from '../controllers/lugar.controller.js';

const router = Router();

router.get('/',        LugarController.listar);       // ?status=sonho&categoriaId=1
router.get('/:id',     LugarController.buscarPorId);
router.post('/',       LugarController.criar);
router.put('/:id',     LugarController.atualizar);
router.delete('/:id',  LugarController.remover);

export default router;
