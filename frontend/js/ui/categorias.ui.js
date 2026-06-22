// Preenche o <select> de categorias no formulário
export function renderCategoriasSelect(categorias) {
  const select = document.getElementById('categoriaId');

  // mantém a primeira opção ("Selecione...")
  select.innerHTML = '<option value="">Selecione...</option>';

  categorias.forEach((categoria) => {
    const option = document.createElement('option');
    option.value = categoria.id;
    option.textContent = categoria.nome;
    select.appendChild(option);
  });
}
