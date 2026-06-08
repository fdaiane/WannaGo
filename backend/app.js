import express from 'express';
import { logger } from './src/middleware/logger.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import lugarRoutes from './src/routes/lugar.routes.js';
import categoriaRoutes from './src/routes/categoria.routes.js';

const app = express();


app.use(express.json());
app.use(logger);


app.use('/api/lugares', lugarRoutes);
app.use('/api/categorias', categoriaRoutes);


app.get('/', (req, res) => {
  res.json({ message: '🌍 Bem-vindo à API do WannaGo!', version: '1.0.0' });
});


app.use(errorHandler);

export default app;
