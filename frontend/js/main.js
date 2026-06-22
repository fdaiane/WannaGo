import { lugaresService } from './services/lugares.service.js';
import { categoriasService } from './services/categorias.service.js';
import { usuariosService } from './services/usuarios.service.js';
import { anotacoesService } from './services/anotacoes.service.js';
import {
  state,
  setLugares,
  setCategorias,
  setUsuarios,
  setFiltroStatus,
  setAnotacoesDoLugar,
  getAnotacoesDoLugar,
} from './state/store.js';
import { renderLugares, renderResumo } from './ui/lugares.ui.js';
import { renderCategoriasSelect } from './ui/categorias.ui.js';
import { renderUsuariosSelect, renderUsuarios } from './ui/usuarios.ui.js';
import { renderAnotacoes } from './ui/anotacoes.ui.js';
import { mostrarFeedback } from './ui/feedback.js';

// ── Elementos ────────────────────────────────────────────────
const formLugar = document.getElementById('form-lugar');
const formUsuario = document.getElementById('form-usuario');
const filtrosContainer = document.getElementById('filtros');

// ── Carregar dados iniciais ─────────────────────────────────
async function init() {
  try {
    const [lugares, categorias, usuarios] = await Promise.all([
      lugaresService.listar(),
      categoriasService.listar(),
      usuariosService.listar(),
    ]);

    setCategorias(categorias);
    setUsuarios(usuarios);
    setLugares(lugares);

    renderCategoriasSelect(state.categorias);
    renderUsuariosSelect(state.usuarios);
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
  renderLugares(state.lugares, {
    onRemover: handleRemoverLugar,
    onToggleAnotacoes: handleCarregarAnotacoes,
    onCriarAnotacao: handleCriarAnotacao,
  });
  renderResumo(state.lugares);
}

// ── Criar lugar (POST) ───────────────────────────────────────
formLugar.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(formLugar);
  const dados = {
    nome: formData.get('nome'),
    pais: formData.get('pais'),
    categoriaId: formData.get('categoriaId'),
    status: formData.get('status'),
    imagemUrl: formData.get('imagemUrl'),
    usuarioId: formData.get('usuarioId'),
  };

  try {
    await lugaresService.criar(dados);
    mostrarFeedback(`"${dados.nome}" foi adicionado à sua lista!`, 'success');
    formLugar.reset();
    await recarregarLugares();
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
});

// ── Remover lugar (DELETE) ────────────────────────────────────
async function handleRemoverLugar(id) {
  const confirmou = confirm('Remover este lugar da sua lista? As anotações dele também serão removidas.');
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

  filtrosContainer
    .querySelectorAll('button')
    .forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  setFiltroStatus(btn.dataset.status);
  await recarregarLugares();
});

// ── Criar usuário (POST) ───────────────────────────────────
formUsuario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(formUsuario);
  const dados = {
    nome: formData.get('nome'),
    email: formData.get('email'),
  };

  try {
    await usuariosService.criar(dados);
    mostrarFeedback(`Usuário "${dados.nome}" cadastrado!`, 'success');
    formUsuario.reset();
    await recarregarUsuarios();
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
});

async function recarregarUsuarios() {
  const usuarios = await usuariosService.listar();
  setUsuarios(usuarios);
  renderUsuariosSelect(state.usuarios);
  renderUsuarios(state.usuarios, { onRemover: handleRemoverUsuario });
  atualizarTela(); // os cards de lugar mostram o nome do autor
}

async function handleRemoverUsuario(id) {
  const confirmou = confirm('Remover este usuário?');
  if (!confirmou) return;

  try {
    await usuariosService.remover(id);
    mostrarFeedback('Usuário removido.', 'success');
    await recarregarUsuarios();
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
}

// ── Anotações (composição de Lugar) ─────────────────────────
async function handleCarregarAnotacoes(lugarId) {
  try {
    const anotacoes = await anotacoesService.listarPorLugar(lugarId);
    setAnotacoesDoLugar(lugarId, anotacoes);
    renderAnotacoes(lugarId, anotacoes, { onRemover: handleRemoverAnotacao });
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
}

async function handleCriarAnotacao(lugarId, texto) {
  try {
    await anotacoesService.criar(lugarId, texto);
    const anotacoes = await anotacoesService.listarPorLugar(lugarId);
    setAnotacoesDoLugar(lugarId, anotacoes);
    renderAnotacoes(lugarId, anotacoes, { onRemover: handleRemoverAnotacao });
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
}

async function handleRemoverAnotacao(id, lugarId) {
  try {
    await anotacoesService.remover(id);
    const anotacoes = await anotacoesService.listarPorLugar(lugarId);
    setAnotacoesDoLugar(lugarId, anotacoes);
    renderAnotacoes(lugarId, anotacoes, { onRemover: handleRemoverAnotacao });
  } catch (erro) {
    mostrarFeedback(erro.message, 'danger');
  }
}

// ── Start ──────────────────────────────────────────────────────
init().then(() => {
  renderUsuarios(state.usuarios, { onRemover: handleRemoverUsuario });
});
