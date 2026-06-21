import { Router } from 'express';
import { AnotacaoController } from '../controllers/anotacao.controller.js';

// rotas aninhadas em /api/lugares/:lugarId/anotacoes
// (expressam a composição: anotação só existe dentro de um lugar)
const router = Router({ mergeParams: true });

router.get('/',   AnotacaoController.listarPorLugar);
router.post('/',  AnotacaoController.criar);

export default router;
