// Renderiza a lista de anotações de um lugar dentro do seu card
export function renderAnotacoes(lugarId, anotacoes, handlers) {
  const container = document.querySelector(`[data-anotacoes-de="${lugarId}"]`);
  if (!container) return;

  if (anotacoes.length === 0) {
    container.innerHTML = '<p class="anotacao-vazia">Nenhuma anotação ainda.</p>';
  } else {
    container.innerHTML = anotacoes
      .map(
        (a) => `
          <div class="anotacao-item">
            <p class="anotacao-texto">${a.texto}</p>
            <button type="button" class="btn-remover-anotacao" data-id="${a.id}" data-lugar-id="${lugarId}" aria-label="Remover anotação">×</button>
          </div>
        `
      )
      .join('');

    container.querySelectorAll('.btn-remover-anotacao').forEach((btn) => {
      btn.addEventListener('click', () => {
        handlers.onRemover(btn.dataset.id, btn.dataset.lugarId);
      });
    });
  }
}
