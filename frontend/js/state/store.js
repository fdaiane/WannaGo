// Estado central da aplicação (em memória)
export const state = {
  lugares: [],
  categorias: [],
  filtroStatus: '',
};

export function setLugares(lista) {
  state.lugares = lista;
}

export function setCategorias(lista) {
  state.categorias = lista;
}

export function setFiltroStatus(status) {
  state.filtroStatus = status;
}

export function getCategoriaPorId(id) {
  return state.categorias.find((c) => c.id === Number(id)) || null;
}
