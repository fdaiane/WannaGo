const STORAGE_KEY = 'wannago:usuarioAtivoId';

function carregarUsuarioAtivo() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  return salvo ? Number(salvo) : null;
}

export const state = {
  lugares: [],
  categorias: [],
  usuarios: [],
  filtroStatus: '',
  usuarioAtivoId: carregarUsuarioAtivo(), // persiste entre recargas
  anotacoesPorLugar: {},
};

export const setLugares      = (l) => { state.lugares = l; };
export const setCategorias   = (l) => { state.categorias = l; };
export const setUsuarios     = (l) => { state.usuarios = l; };
export const setFiltroStatus = (s) => { state.filtroStatus = s; };
export const setUsuarioAtivo = (id) => {
  const valor = id ? Number(id) : null;
  state.usuarioAtivoId = valor;
  if (valor) localStorage.setItem(STORAGE_KEY, valor);
  else        localStorage.removeItem(STORAGE_KEY);
};
export const setAnotacoesDoLugar = (lugarId, lista) => { state.anotacoesPorLugar[lugarId] = lista; };
export const getAnotacoesDoLugar = (lugarId) => state.anotacoesPorLugar[lugarId] || [];
export const getCategoriaPorId   = (id) => state.categorias.find((c) => c.id === Number(id)) || null;
export const getUsuarioPorId     = (id) => state.usuarios.find((u) => u.id === Number(id)) || null;