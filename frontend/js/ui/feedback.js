// Mostra mensagens de sucesso/erro no topo da lista
export function mostrarFeedback(mensagem, tipo = 'success') {
  const container = document.getElementById('feedback');

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.role = 'alert';
  alerta.innerHTML = `
    ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
  `;

  container.appendChild(alerta);

  // Remove automaticamente após 4 segundos
  setTimeout(() => {
    alerta.classList.remove('show');
    alerta.addEventListener('transitionend', () => alerta.remove());
  }, 4000);
}
