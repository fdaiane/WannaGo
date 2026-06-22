import express from 'express';
import cors from 'cors';
import { logger } from './src/middleware/logger.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import lugarRoutes from './src/routes/lugar.routes.js';
import categoriaRoutes from './src/routes/categoria.routes.js';
import statusRoutes from './src/routes/status.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import anotacaoRoutes from './src/routes/anotacao.routes.js';
import anotacaoDiretaRoutes from './src/routes/anotacaoDireta.routes.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(logger);


app.use('/api/lugares', lugarRoutes);
app.use('/api/lugares/:lugarId/anotacoes', anotacaoRoutes); 
app.use('/api/categorias', categoriaRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/anotacoes', anotacaoDiretaRoutes); 


app.get('/', (req, res) => {
  res.json({ message: '🌍 Bem-vindo à API do WannaGo!', version: '1.0.0' });
});


app.use(errorHandler);

export default app;