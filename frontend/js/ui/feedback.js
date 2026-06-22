const ICONS    = { success: '✅', danger: '❌', info: 'ℹ️' };
const DURACAO  = { success: 3500, danger: 5500, info: 4000 };

export function mostrarFeedback(mensagem, tipo = 'success') {
  const container = document.getElementById('feedback');

  const toast = document.createElement('div');
  toast.className = `feedback-toast feedback-toast--${tipo}`;
  toast.innerHTML = `
    <span class="feedback-toast__icon">${ICONS[tipo] || 'ℹ️'}</span>
    <span class="feedback-toast__msg">${mensagem}</span>
    <button type="button" class="feedback-toast__close" aria-label="Fechar">×</button>
  `;

  container.appendChild(toast);

  const fechar = () => {
    toast.style.animation = 'toastOut 0.25s ease forwards';
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.feedback-toast__close').addEventListener('click', fechar);
  setTimeout(fechar, DURACAO[tipo] || 4000);
}
