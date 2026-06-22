import { state } from '../state/store.js';

export function renderUsuariosSelect(usuarios) {
  const select = document.getElementById('usuarioId');
  if (!select) return;
  select.innerHTML = '<option value="">Sem usuário vinculado</option>';
  usuarios.forEach((u) => {
    const o = document.createElement('option');
    o.value = u.id;
    o.textContent = `${u.nome} (${u.email})`;
    select.appendChild(o);
  });
}

// Atualiza o badge no header e o campo oculto do form
export function renderUsuarioAtivoHeader() {
  const header  = document.getElementById('usuario-ativo-header');
  const campo   = document.getElementById('usuarioId');
  const aviso   = document.getElementById('aviso-usuario-ativo');

  if (!header) return;

  if (state.usuarioAtivoId) {
    const u = state.usuarios.find((u) => u.id === state.usuarioAtivoId);
    if (!u) { header.innerHTML = ''; return; }

    header.innerHTML = `
      <div class="usuario-ativo-badge">
        👋 Olá, <strong>${u.nome}</strong>
        <button type="button" id="btn-sair-usuario" title="Sair">×</button>
      </div>
    `;

    if (campo) campo.value = u.id;

    if (aviso) {
      aviso.textContent = `✓ Vinculando a ${u.nome}`;
      aviso.classList.remove('d-none');
    }

  } else {
    header.innerHTML = '';
    if (campo) campo.value = '';
    if (aviso) aviso.classList.add('d-none');
  }
}

export function renderUsuarios(usuarios, handlers) {
  const container = document.getElementById('lista-usuarios');
  if (!container) return;
  container.innerHTML = '';

  if (usuarios.length === 0) {
    container.innerHTML = '<p class="text-muted small mb-0">Nenhum usuário cadastrado ainda.</p>';
    return;
  }

  usuarios.forEach((u) => {
    const isAtivo = u.id === state.usuarioAtivoId;
    const item = document.createElement('div');
    item.className = `usuario-pill${isAtivo ? ' ativo' : ''}`;

    item.innerHTML = `
      <span>${u.nome} <span class="email">· ${u.email}</span></span>
      <button type="button" class="btn-login-usuario" data-id="${u.id}">
        ${isAtivo ? '✓ ativo' : 'Entrar'}
      </button>
      <button type="button" class="btn-remover-usuario" data-id="${u.id}" aria-label="Remover">×</button>
    `;

    container.appendChild(item);
  });

  container.querySelectorAll('.btn-login-usuario').forEach((btn) => {
    btn.addEventListener('click', () => handlers.onLogin(btn.dataset.id));
  });

  container.querySelectorAll('.btn-remover-usuario').forEach((btn) => {
    btn.addEventListener('click', () => handlers.onRemover(btn.dataset.id));
  });
}
