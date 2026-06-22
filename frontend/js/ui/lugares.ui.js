import { getCategoriaPorId, getUsuarioPorId } from '../state/store.js';

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
 * @param {Object} handlers - { onRemover, onToggleAnotacoes, onCriarAnotacao, onRemoverAnotacao }
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
    const usuario = getUsuarioPorId(lugar.usuarioId);

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

          ${
            usuario
              ? `<p class="lugar-card__autor">adicionado por <strong>${usuario.nome}</strong></p>`
              : ''
          }

          <button type="button" class="btn-toggle-anotacoes" data-lugar-id="${lugar.id}">
            📝 Anotações
          </button>

          <div class="anotacoes-bloco d-none" data-anotacoes-bloco="${lugar.id}">
            <div class="anotacoes-lista" data-anotacoes-de="${lugar.id}">
              <p class="anotacao-vazia">Carregando...</p>
            </div>
            <form class="form-anotacao" data-lugar-id="${lugar.id}">
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Adicionar uma anotação..."
                maxlength="280"
                required
              />
              <button type="submit" class="btn btn-sm btn-outline-primary">+</button>
            </form>
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

  // liga os eventos de remover lugar
  container.querySelectorAll('.btn-remover').forEach((btn) => {
    btn.addEventListener('click', () => {
      handlers.onRemover(btn.dataset.id);
    });
  });

  // liga o toggle de anotações (expandir/colapsar + carregar sob demanda)
  container.querySelectorAll('.btn-toggle-anotacoes').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lugarId = btn.dataset.lugarId;
      const bloco = container.querySelector(`[data-anotacoes-bloco="${lugarId}"]`);
      const estavaEscondido = bloco.classList.contains('d-none');
      bloco.classList.toggle('d-none');
      if (estavaEscondido) {
        handlers.onToggleAnotacoes(lugarId);
      }
    });
  });

  // liga o formulário de criar anotação
  container.querySelectorAll('.form-anotacao').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input');
      const texto = input.value.trim();
      if (!texto) return;
      handlers.onCriarAnotacao(form.dataset.lugarId, texto);
      input.value = '';
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
