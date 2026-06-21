import { getCategoriaPorId } from '../state/store.js';

const STATUS_LABELS = {
  sonho: 'Sonho',
  planejando: 'Planejando',
  visitado: 'Visitado',
};

const PLACEHOLDER_EMOJI = {
  sonho: '✨',
  planejando: '🧳',
  visitado: '✅',
};

/**
 * Renderiza a lista de lugares como cards Bootstrap.
 * @param {Array} lugares
 * @param {Object} handlers - { onRemover }
 */
export function renderLugares(lugares, handlers) {
  const container = document.getElementById('lista-lugares');
  const estadoVazio = document.getElementById('estado-vazio');

  container.innerHTML = '';

  if (lugares.length === 0) {
    estadoVazio.classList.remove('d-none');
    return;
  }

  estadoVazio.classList.add('d-none');

  lugares.forEach((lugar) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';

    const categoria = getCategoriaPorId(lugar.categoriaId);

    col.innerHTML = `
      <article class="lugar-card">
        ${
          lugar.imagemUrl
            ? `<img src="${lugar.imagemUrl}" alt="Foto de ${lugar.nome}" class="lugar-card__img" />`
            : `<div class="lugar-card__img lugar-card__img--placeholder">${PLACEHOLDER_EMOJI[lugar.status] || '📍'}</div>`
        }
        <div class="lugar-card__body">
          <h3 class="lugar-card__nome">${lugar.nome}</h3>
          <p class="lugar-card__pais">${lugar.pais}</p>

          <div class="lugar-card__badges">
            <span class="badge-status badge-status--${lugar.status}">
              ${STATUS_LABELS[lugar.status] || lugar.status}
            </span>
            ${
              categoria
                ? `<span class="badge-categoria">${categoria.nome}</span>`
                : ''
            }
          </div>

          <div class="lugar-card__acoes">
            <button type="button" class="btn-remover" data-id="${lugar.id}">
              Remover
            </button>
          </div>
        </div>
      </article>
    `;

    container.appendChild(col);
  });

  // liga os eventos de remover
  container.querySelectorAll('.btn-remover').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      handlers.onRemover(id);
    });
  });
}

/**
 * Atualiza as pílulas de resumo no header.
 */
export function renderResumo(lugares) {
  const container = document.getElementById('resumo');

  const total = lugares.length;
  const visitados = lugares.filter((l) => l.status === 'visitado').length;
  const planejando = lugares.filter((l) => l.status === 'planejando').length;
  const sonhos = lugares.filter((l) => l.status === 'sonho').length;

  container.innerHTML = `
    <span class="resumo-pill"><strong>${total}</strong> lugares</span>
    <span class="resumo-pill"><strong>${visitados}</strong> visitados</span>
    <span class="resumo-pill"><strong>${planejando}</strong> planejando</span>
    <span class="resumo-pill"><strong>${sonhos}</strong> sonhos</span>
  `;
}
