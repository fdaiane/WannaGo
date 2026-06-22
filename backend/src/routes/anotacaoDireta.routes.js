import { Router } from 'express';
import { AnotacaoController } from '../controllers/anotacao.controller.js';

// rotas diretas em /api/anotacoes/:id
// (para buscar, editar e remover uma anotação específica)
const router = Router();

router.get('/:id',     AnotacaoController.buscarPorId);
router.put('/:id',     AnotacaoController.atualizar);
router.delete('/:id',  AnotacaoController.remover);

export default router;
