// Preenche o <select> de usuários no formulário (autor do lugar)
export function renderUsuariosSelect(usuarios) {
  const select = document.getElementById('usuarioId');
  if (!select) return;

  select.innerHTML = '<option value="">Sem usuário vinculado</option>';

  usuarios.forEach((usuario) => {
    const option = document.createElement('option');
    option.value = usuario.id;
    option.textContent = `${usuario.nome} (${usuario.email})`;
    select.appendChild(option);
  });
}

// Renderiza a lista de usuários cadastrados (cards pequenos)
export function renderUsuarios(usuarios, handlers) {
  const container = document.getElementById('lista-usuarios');
  if (!container) return;

  container.innerHTML = '';

  if (usuarios.length === 0) {
    container.innerHTML = '<p class="text-muted small mb-0">Nenhum usuário cadastrado ainda.</p>';
    return;
  }

  usuarios.forEach((usuario) => {
    const item = document.createElement('div');
    item.className = 'usuario-pill';
    item.innerHTML = `
      <span>${usuario.nome} <span class="text-muted">· ${usuario.email}</span></span>
      <button type="button" class="btn-remover-usuario" data-id="${usuario.id}" aria-label="Remover usuário">×</button>
    `;
    container.appendChild(item);
  });

  container.querySelectorAll('.btn-remover-usuario').forEach((btn) => {
    btn.addEventListener('click', () => handlers.onRemover(btn.dataset.id));
  });
}
