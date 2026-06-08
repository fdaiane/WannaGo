export function errorHandler(err, req, res, next) {
  console.error(`[ERRO] ${err.message}`);

  const status = err.status || 500;
  res.status(status).json({
    erro: err.message || 'Erro interno do servidor',
  });
}
