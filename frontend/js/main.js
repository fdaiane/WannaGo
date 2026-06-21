import { lugaresService } from './services/lugares.service.js';
import { categoriasService } from './services/categorias.service.js';
import {
  state,
  setLugares,
  setCategorias,
  setFiltroStatus,
} from './state/store.js';
import { renderLugares, renderResumo } from './ui/lugares.ui.js';
import { renderCategoriasSelect } from './ui/categorias.ui.js';
import { mostrarFeedback } from './ui/feedback.js';

// ── Elementos ────────────────────────────────────────────────
const form = document.getElementById('form-lugar');
const filtrosContainer = document.getElementById('filtros');

// ── Carregar dados iniciais ─────────────────────────────────
async function init() {
  try {
    const [lugares, categorias] = await Promise.all([
      lugaresService.listar(),
      categoriasService.listar(),
    ]);

    setCategorias(categorias);
    setLugares(lugares);

    renderCategoriasSelect(state.categorias);
    atualizarTela();
  } catch (erro) {
    mostrarFeedback(
      `Não foi possível carregar os dados. Verifique se a API está rodando em http://localhost:3000. (${erro.message})`,
      'danger'
    );
  }
}

// ── Recarregar lugares (com filtro atual) e re-renderizar ───
async function recarregarLugares() {
  const filtros = state.filtroStatus ? { status: state.filtroStatus } : {};
  const lugares = await lugaresService.listar(filtros);
  setLugares(lugares);
  atualizarTela();
}

function atualizarTela() {
  renderLugares(state.lugares, { onRemover: handleRemover });
  renderResumo(state.lugares);
}

// ── Criar lugar (POST) ───────────────────────────────────────
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const dados = {
    nome: formData.get('nome'),
    pais: formData.get('pais'),
    categoriaId: formData.get('categoriaId'),
    status: formData.get('status'),
    imagemUrl: formData.get('imagemUrl'),
  };

  try {
    await lugaresService.criar(dados);
    mostrarFeedback(`"${dados.nome}" foi adicionado à sua lista!`, 'success');
    form.reset();
    await recarregarLugares();
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
});

// ── Remover lugar (DELETE) ────────────────────────────────────
async function handleRemover(id) {
  const confirmou = confirm('Remover este lugar da sua lista?');
  if (!confirmou) return;

  try {
    await lugaresService.remover(id);
    mostrarFeedback('Lugar removido.', 'success');
    await recarregarLugares();
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
}

// ── Filtros por status ─────────────────────────────────────
filtrosContainer.addEventListener('click', async (event) => {
  const btn = event.target.closest('button[data-status]');
  if (!btn) return;

  // alterna o botão ativo
  filtrosContainer
    .querySelectorAll('button')
    .forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  setFiltroStatus(btn.dataset.status);
  await recarregarLugares();
});

// ── Start ──────────────────────────────────────────────────────
init();
