
let lugares = [
  {
    id: 1,
    nome: 'Praia de Pipa',
    pais: 'Brasil',
    categoriaId: 1,
    status: 'sonho',
    imagemUrl: '',
    criadoEm: new Date().toISOString(),
  },
  {
    id: 2,
    nome: 'Paris',
    pais: 'França',
    categoriaId: 2,
    status: 'planejando',
    imagemUrl: '',
    criadoEm: new Date().toISOString(),
  },
];

let proximoId = 3;

export const LugarModel = {
  listar(filtros = {}) {
    let resultado = [...lugares];
    if (filtros.status) {
      resultado = resultado.filter((l) => l.status === filtros.status);
    }
    if (filtros.categoriaId) {
      resultado = resultado.filter(
        (l) => l.categoriaId === Number(filtros.categoriaId)
      );
    }
    return resultado;
  },

  buscarPorId(id) {
    return lugares.find((l) => l.id === Number(id)) || null;
  },

  inserir(dados) {
    const novo = {
      id: proximoId++,
      ...dados,
      criadoEm: new Date().toISOString(),
    };
    lugares.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const index = lugares.findIndex((l) => l.id === Number(id));
    if (index === -1) return null;
    lugares[index] = { ...lugares[index], ...dados };
    return lugares[index];
  },

  remover(id) {
    const index = lugares.findIndex((l) => l.id === Number(id));
    if (index === -1) return null;
    const removido = lugares[index];
    lugares.splice(index, 1);
    return removido;
  },
};
