import express from 'express';
import cors from 'cors';
import { logger } from './src/middleware/logger.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import lugarRoutes from './src/routes/lugar.routes.js';
import categoriaRoutes from './src/routes/categoria.routes.js';

const app = express();

// ── Middleware globais ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger);

// ── Rotas ───────────────────────────────────────────────────
app.use('/api/lugares', lugarRoutes);
app.use('/api/categorias', categoriaRoutes);

// ── Rota raiz ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🌍 Bem-vindo à API do WannaGo!', version: '1.0.0' });
});

// ── Error handler (deve ser o último middleware) ────────────
app.use(errorHandler);

export default app;