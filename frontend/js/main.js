import { lugaresService }   from './services/lugares.service.js';
import { categoriasService } from './services/categorias.service.js';
import { usuariosService }  from './services/usuarios.service.js';
import { anotacoesService } from './services/anotacoes.service.js';
import {
  state, setLugares, setCategorias, setUsuarios,
  setFiltroStatus, setUsuarioAtivo, setAnotacoesDoLugar,
} from './state/store.js';
import { renderLugares, renderResumo }                    from './ui/lugares.ui.js';
import { renderCategoriasSelect }                         from './ui/categorias.ui.js';
import { renderUsuarios, renderUsuarioAtivoHeader }       from './ui/usuarios.ui.js';
import { renderAnotacoes }                                from './ui/anotacoes.ui.js';
import { mostrarFeedback }                                from './ui/feedback.js';
import { confirmar }                                      from './ui/modal.js';

const formLugar   = document.getElementById('form-lugar');
const formUsuario = document.getElementById('form-usuario');
const filtrosEl   = document.getElementById('filtros');

// ── Init ────────────────────────────────────────────────────
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
    renderUsuarios(state.usuarios, { onLogin: handleLogin, onRemover: handleRemoverUsuario });
    renderUsuarioAtivoHeader();
    atualizarTela();
  } catch (e) {
    mostrarFeedback(`Não foi possível conectar à API. Verifique se o backend está rodando. (${e.message})`, 'danger');
  }
}

function atualizarTela() {
  renderLugares(state.lugares, {
    onRemover: handleRemoverLugar,
    onToggleAnotacoes: handleCarregarAnotacoes,
    onCriarAnotacao: handleCriarAnotacao,
  });
  renderResumo(state.lugares);
}

async function recarregarLugares() {
  const filtros = state.filtroStatus ? { status: state.filtroStatus } : {};
  setLugares(await lugaresService.listar(filtros));
  atualizarTela();
  renderUsuarioAtivoHeader();
  renderUsuarios(state.usuarios, { onLogin: handleLogin, onRemover: handleRemoverUsuario });
}

async function recarregarUsuarios() {
  const usuarios = await usuariosService.listar();
  setUsuarios(usuarios);
  renderUsuarios(usuarios, { onLogin: handleLogin, onRemover: handleRemoverUsuario });
  renderUsuarioAtivoHeader();
  atualizarTela();
}

// ── Usuário ativo ───────────────────────────────────────────
function handleLogin(id) {
  const jaEraAtivo = state.usuarioAtivoId === Number(id);
  setUsuarioAtivo(jaEraAtivo ? null : id);
  renderUsuarios(state.usuarios, { onLogin: handleLogin, onRemover: handleRemoverUsuario });
  renderUsuarioAtivoHeader();
  const u = state.usuarios.find((u) => u.id === state.usuarioAtivoId);
  if (u) mostrarFeedback(`Você entrou como ${u.nome}. Os próximos lugares serão vinculados a você!`, 'info');
  else    mostrarFeedback('Sessão encerrada.', 'info');
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'btn-sair-usuario') {
    setUsuarioAtivo(null);
    renderUsuarios(state.usuarios, { onLogin: handleLogin, onRemover: handleRemoverUsuario });
    renderUsuarioAtivoHeader();
    mostrarFeedback('Sessão encerrada.', 'info');
  }
});

// ── Criar lugar ─────────────────────────────────────────────
formLugar.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(formLugar);
  const dados = {
    nome: fd.get('nome'), pais: fd.get('pais'),
    categoriaId: fd.get('categoriaId'), status: fd.get('status'),
    imagemUrl: fd.get('imagemUrl'), usuarioId: fd.get('usuarioId'),
  };
  try {
    await lugaresService.criar(dados);
    mostrarFeedback(`"${dados.nome}" foi adicionado à sua lista! ✈️`, 'success');
    formLugar.reset();
    const campo = document.getElementById('usuarioId');
    if (campo && state.usuarioAtivoId) campo.value = state.usuarioAtivoId;
    await recarregarLugares();
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
});

// ── Remover lugar ────────────────────────────────────────────
async function handleRemoverLugar(id) {
  const lugar = state.lugares.find((l) => l.id === Number(id));
  const ok = await confirmar({
    titulo: 'Remover lugar',
    mensagem: `Tem certeza que deseja remover <strong>"${lugar?.nome || 'este lugar'}"</strong>? As anotações vinculadas também serão removidas.`,
    textoBotaoOk: 'Sim, remover',
    tipoBotao: 'danger',
  });
  if (!ok) return;
  try {
    await lugaresService.remover(id);
    mostrarFeedback(`"${lugar?.nome}" foi removido.`, 'success');
    await recarregarLugares();
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
}

// ── Filtros ──────────────────────────────────────────────────
filtrosEl.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-status]');
  if (!btn) return;
  filtrosEl.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  setFiltroStatus(btn.dataset.status);
  await recarregarLugares();
});

// ── Criar usuário ────────────────────────────────────────────
formUsuario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(formUsuario);
  const dados = { nome: fd.get('nome'), email: fd.get('email') };
  try {
    const novo = await usuariosService.criar(dados);
    mostrarFeedback(`Usuário "${novo.nome}" cadastrado! Clique em Entrar para ativá-lo.`, 'success');
    formUsuario.reset();
    await recarregarUsuarios();
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
});

// ── Remover usuário ──────────────────────────────────────────
async function handleRemoverUsuario(id) {
  const u = state.usuarios.find((u) => u.id === Number(id));
  const nome = u?.nome || 'este usuário';
  const temLugares = state.lugares.some((l) => l.usuarioId === Number(id));

  const ok = await confirmar({
    titulo: `Remover ${nome}`,
    mensagem: temLugares
      ? `<strong>${nome}</strong> tem lugares vinculados. Ao remover o usuário, os lugares dele também serão removidos permanentemente.`
      : `Tem certeza que deseja remover o usuário <strong>${nome}</strong>?`,
    textoBotaoOk: 'Sim, remover',
    tipoBotao: 'danger',
  });
  if (!ok) return;

  try {
    await usuariosService.remover(id);
    if (state.usuarioAtivoId === Number(id)) setUsuarioAtivo(null);
    mostrarFeedback(`${nome} foi removido com sucesso.`, 'success');
    await recarregarUsuarios();
    await recarregarLugares();
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
}

// ── Anotações ─────────────────────────────────────────────────
async function handleCarregarAnotacoes(lugarId) {
  try {
    const lista = await anotacoesService.listarPorLugar(lugarId);
    setAnotacoesDoLugar(lugarId, lista);
    renderAnotacoes(lugarId, lista, { onRemover: handleRemoverAnotacao });
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
}

async function handleCriarAnotacao(lugarId, texto) {
  try {
    await anotacoesService.criar(lugarId, texto);
    const lista = await anotacoesService.listarPorLugar(lugarId);
    setAnotacoesDoLugar(lugarId, lista);
    renderAnotacoes(lugarId, lista, { onRemover: handleRemoverAnotacao });
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
}

async function handleRemoverAnotacao(id, lugarId) {
  try {
    await anotacoesService.remover(id);
    const lista = await anotacoesService.listarPorLugar(lugarId);
    setAnotacoesDoLugar(lugarId, lista);
    renderAnotacoes(lugarId, lista, { onRemover: handleRemoverAnotacao });
  } catch (err) { mostrarFeedback(err.message, 'danger'); }
}

init();
