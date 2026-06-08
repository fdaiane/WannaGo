
let categorias = [
  { id: 1, nome: 'Praia' },
  { id: 2, nome: 'Cidade' },
  { id: 3, nome: 'Natureza' },
  { id: 4, nome: 'Cultural' },
];

let proximoId = 5;

export const CategoriaModel = {
  listar() {
    return categorias;
  },

  buscarPorId(id) {
    return categorias.find((c) => c.id === Number(id)) || null;
  },

  inserir(dados) {
    const nova = { id: proximoId++, ...dados };
    categorias.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const index = categorias.findIndex((c) => c.id === Number(id));
    if (index === -1) return null;
    categorias[index] = { ...categorias[index], ...dados };
    return categorias[index];
  },

  remover(id) {
    const index = categorias.findIndex((c) => c.id === Number(id));
    if (index === -1) return null;
    const removida = categorias[index];
    categorias.splice(index, 1);
    return removida;
  },
};
