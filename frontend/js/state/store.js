// Estado central da aplicação (em memória)
export const state = {
  lugares: [],
  categorias: [],
  usuarios: [],
  filtroStatus: '',
  usuarioAtivoId: null,     // usuário "logado" de forma simples, sem autenticação
  anotacoesPorLugar: {},    // cache: { [lugarId]: Anotacao[] }
};

export function setLugares(lista) {
  state.lugares = lista;
}

export function setCategorias(lista) {
  state.categorias = lista;
}

export function setUsuarios(lista) {
  state.usuarios = lista;
}

export function setFiltroStatus(status) {
  state.filtroStatus = status;
}

export function setUsuarioAtivo(id) {
  state.usuarioAtivoId = id ? Number(id) : null;
}

export function setAnotacoesDoLugar(lugarId, anotacoes) {
  state.anotacoesPorLugar[lugarId] = anotacoes;
}

export function getAnotacoesDoLugar(lugarId) {
  return state.anotacoesPorLugar[lugarId] || [];
}

export function getCategoriaPorId(id) {
  return state.categorias.find((c) => c.id === Number(id)) || null;
}

export function getUsuarioPorId(id) {
  return state.usuarios.find((u) => u.id === Number(id)) || null;
}
