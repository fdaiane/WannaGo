# Relatório de Avaliação Heurística — Projeto 1 (WannaGo)

Autor: Daiane  
Data: 20/07/2026  
Score Lighthouse (Acessibilidade): 72 / 100

---

## Problema 1

- **Onde:** Formulário de lugar — botão "Adicionar lugar"
- **O que observei:** Ao clicar em "Adicionar lugar", o botão permanece clicável e a tela fica sem resposta visual enquanto o `fetch` é processado. O usuário não sabe se o clique funcionou, podendo clicar múltiplas vezes e criar lugares duplicados.
- **Heurística violada:** #1 — Visibilidade do status do sistema
- **Gravidade:** 3
- **Correção proposta:** Desabilitar o botão e trocar seu texto para "Adicionando..." durante o `fetch`. Reabilitar após a resposta da API.
- **Evidência:** Observado ao criar um lugar com conexão lenta ou API sobrecarregada.

---

## Problema 2

- **Onde:** Mensagens de erro retornadas pela API
- **O que observei:** Quando a API retorna um erro técnico (ex: "FOREIGN KEY constraint failed"), essa mensagem aparece diretamente na tela para o usuário, sem tradução para linguagem humana. O usuário não entende o que significa nem o que fazer.
- **Heurística violada:** #2 — Correspondência com o mundo real
- **Gravidade:** 4
- **Correção proposta:** Criar um mapeamento de erros técnicos para mensagens amigáveis no `client.js`. Ex: "FOREIGN KEY constraint failed" → "Não foi possível completar a ação. Tente novamente."
- **Evidência:** Testado ao remover usuário com banco.db sem CASCADE configurado.

---

## Problema 3

- **Onde:** Ação de remover lugar ou usuário
- **O que observei:** Apesar de existir um modal de confirmação, não há como **desfazer** a remoção após confirmar. Uma vez removido, o dado se perde permanentemente sem possibilidade de recuperação.
- **Heurística violada:** #3 — Controle e liberdade do usuário
- **Gravidade:** 3
- **Correção proposta:** Adicionar um toast de "Removido" com um botão "Desfazer" que apareça por 5 segundos antes de executar a remoção de fato. Dentro desse tempo, o usuário pode cancelar.
- **Evidência:** Observado ao remover acidentalmente um lugar cadastrado.

---

## Problema 4

- **Onde:** Seção de usuários — pílulas de usuário
- **O que observei:** O botão "Entrar" tem aparência diferente do botão "Cadastrar" e do botão "Adicionar lugar", mesmo sendo todos ações primárias. A inconsistência visual pode confundir o usuário sobre qual ação é mais importante.
- **Heurística violada:** #4 — Consistência e padrões
- **Gravidade:** 2
- **Correção proposta:** Padronizar o estilo dos botões de ação primária em toda a interface, usando a mesma família visual (cor, borda, tamanho) para ações do mesmo nível de importância.
- **Evidência:** Comparando visualmente `btn-login-usuario` com `btn-primary`.

---

## Problema 5

- **Onde:** Campo de e-mail no formulário de usuário
- **O que observei:** A validação de e-mail acontece apenas no backend. Se o usuário digitar um e-mail inválido, ele preenche todos os campos, clica em "Cadastrar" e só então recebe o erro. Não há validação nem feedback em tempo real no frontend.
- **Heurística violada:** #5 — Prevenção de erros
- **Gravidade:** 2
- **Correção proposta:** Adicionar validação em tempo real no campo de e-mail usando o evento `blur` (ao sair do campo), mostrando uma mensagem de erro antes do envio do formulário.
- **Evidência:** Testado digitando "email_invalido" e submetendo o formulário.

---

## Problema 6

- **Onde:** Campo "Status" no formulário de lugar
- **O que observei:** As opções de status (Sonho, Planejando, Visitado) estão visíveis no `<select>`, o que é bom. Porém, não há nenhuma descrição do que cada status significa. Um usuário novo pode não saber a diferença entre "Sonho" e "Planejando".
- **Heurística violada:** #6 — Reconhecimento em vez de lembrança
- **Gravidade:** 1
- **Correção proposta:** Adicionar um tooltip ou texto de ajuda abaixo do campo explicando brevemente cada status. Ex: "Sonho = quero ir um dia · Planejando = já estou organizando · Visitado = já fui!"
- **Evidência:** Observado durante o primeiro uso da interface por um usuário novo.

---

## Problema 7

- **Onde:** Interface geral — ausência de atalhos
- **O que observei:** Não há atalhos de teclado para ações frequentes como adicionar lugar, filtrar por status ou abrir anotações. Usuários que usam o sistema com frequência precisam sempre navegar pelos campos com o mouse.
- **Heurística violada:** #7 — Flexibilidade e eficiência de uso
- **Gravidade:** 1
- **Correção proposta:** Adicionar atalhos básicos como `Ctrl+Enter` para submeter formulários e foco automático no primeiro campo ao carregar a página.
- **Evidência:** Testado tentando usar a interface apenas com teclado.

---

## Problema 8

- **Onde:** Card de lugar — informações exibidas
- **O que observei:** Cada card exibe: imagem, nome, país, badge de status, badge de categoria, "adicionado por", botão de anotações e botão remover. Em cards sem imagem, o espaço do placeholder ocupa muito espaço visual em relação à informação útil exibida.
- **Heurística violada:** #8 — Estética e design minimalista
- **Gravidade:** 1
- **Correção proposta:** Reduzir a altura do placeholder quando não há imagem (de 140px para 80px), dando mais protagonismo às informações textuais do card.
- **Evidência:** Visível em cards sem URL de imagem cadastrada.

---

## Problema 9

- **Onde:** Feedback de erros de validação
- **O que observei:** Quando um campo obrigatório não é preenchido (ex: nome do lugar em branco), o navegador exibe seu alerta padrão de validação HTML5. Esse alerta não segue a identidade visual do projeto e não é consistente com os toasts customizados usados para outros erros.
- **Heurística violada:** #9 — Ajudar os usuários a reconhecer, diagnosticar e corrigir erros
- **Gravidade:** 2
- **Correção proposta:** Desativar a validação nativa do HTML5 (`novalidate` no `<form>`) e implementar validação manual com mensagens de erro customizadas inline, abaixo de cada campo, usando a paleta do projeto.
- **Evidência:** Testado submetendo o formulário com o campo "Nome do lugar" vazio.

---

## Problema 10 (Acessibilidade — SPA)

- **Onde:** Lista de lugares (`#lista-lugares`)
- **O que observei:** Quando o JavaScript atualiza a lista de lugares (ao criar, remover ou filtrar), leitores de tela não são notificados da mudança porque o elemento não possui o atributo `aria-live`. Um usuário com deficiência visual não saberá que a lista foi atualizada.
- **Heurística violada:** #1 — Visibilidade do status / Acessibilidade de SPA
- **Gravidade:** 3
- **Correção proposta:** Adicionar `aria-live="polite"` na `<section id="lista-lugares">` e `aria-live="assertive"` no `<div id="feedback">` para que leitores de tela anunciem as mudanças dinamicamente.
- **Evidência:** Testado com leitor de tela VoiceOver (macOS) / NVDA (Windows).

---

## Problema 11 (Acessibilidade — SPA)

- **Onde:** Ação de remover lugar ou usuário
- **O que observei:** Após remover um item da lista, o foco do teclado "cai no vácuo" — o elemento removido sumiu do DOM e o foco não é reposicionado em lugar algum. O usuário que navega por teclado perde a referência de onde está na página.
- **Heurística violada:** #3 — Controle e liberdade / Acessibilidade de SPA
- **Gravidade:** 3
- **Correção proposta:** Após a remoção, reposicionar o foco com `.focus()` para o título da seção "Seus lugares" ou para o card anterior ao removido.
- **Evidência:** Testado navegando pela lista usando Tab e removendo um item com Enter.

---

## Resumo

| Item | Valor |
|------|-------|
| Total de problemas encontrados | 11 |
| Gravidade 4 (catastrófico) | 1 |
| Gravidade 3 (maior — prioritários) | 4 |
| Gravidade 2 (menor) | 3 |
| Gravidade 1 (cosmético) | 3 |
| Score de acessibilidade Lighthouse | 72 / 100 |
