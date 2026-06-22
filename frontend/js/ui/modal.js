/**
 * Modal de confirmação customizado — substitui o confirm() do navegador.
 * Retorna uma Promise<boolean>: true se confirmou, false se cancelou.
 */
export function confirmar({ titulo, mensagem, textoBotaoOk = 'Confirmar', tipoBotao = 'danger' }) {
  return new Promise((resolve) => {
    // Remove modal anterior se existir
    document.getElementById('wg-modal-overlay')?.remove();

    const cores = {
      danger: { btn: 'btn-modal--danger', icon: '🗑️' },
      info:   { btn: 'btn-modal--info',   icon: '❓' },
    };
    const cor = cores[tipoBotao] || cores.danger;

    const overlay = document.createElement('div');
    overlay.id = 'wg-modal-overlay';
    overlay.className = 'wg-modal-overlay';
    overlay.innerHTML = `
      <div class="wg-modal" role="dialog" aria-modal="true" aria-labelledby="wg-modal-titulo">
        <div class="wg-modal__icon">${cor.icon}</div>
        <h3 class="wg-modal__titulo" id="wg-modal-titulo">${titulo}</h3>
        <p class="wg-modal__mensagem">${mensagem}</p>
        <div class="wg-modal__acoes">
          <button type="button" class="btn-modal btn-modal--cancelar" id="wg-modal-cancelar">Cancelar</button>
          <button type="button" class="btn-modal ${cor.btn}" id="wg-modal-ok">${textoBotaoOk}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Foca no botão de cancelar por segurança (evita confirmação acidental)
    setTimeout(() => document.getElementById('wg-modal-cancelar')?.focus(), 50);

    const fechar = (resultado) => {
      overlay.classList.add('wg-modal-overlay--saindo');
      overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
      resolve(resultado);
    };

    document.getElementById('wg-modal-ok').addEventListener('click', () => fechar(true));
    document.getElementById('wg-modal-cancelar').addEventListener('click', () => fechar(false));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(false); }, { once: true });
  });
}
