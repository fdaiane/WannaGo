# 🌍 WannaGo

> *Organize os lugares que você sonha, planeja e já visitou — tudo em um só lugar.*

---

## ✈️ Sobre o Projeto

Quantas vezes você pensou "um dia eu vou lá" e esqueceu? O **WannaGo** resolve isso.
É uma aplicação fullstack para você montar sua lista pessoal de destinos, acompanhar sua jornada de viajante e guardar memórias de cada lugar.

Cada usuário pode cadastrar lugares, classificá-los por categoria e status, adicionar anotações e filtrar sua lista — tudo com uma interface visual e responsiva.

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Backend | Node.js + Express |
| Banco de dados | SQLite (via `node:sqlite` nativo) |
| Frontend | HTML + CSS + Bootstrap 5 |
| Fonte | Google Fonts (Fraunces + Inter) |

---

## 📁 Estrutura do Projeto

```
wannago/
├── app.js                  # Configuração do Express e registro de rotas
├── server.js               # Ponto de entrada — sobe o servidor
├── banco.db                # Banco SQLite (gerado automaticamente)
├── src/
│   ├── db.js               # Conexão e criação das tabelas + seed inicial
│   ├── controllers/
│   │   ├── anotacao.controller.js
│   │   ├── categoria.controller.js
│   │   ├── lugar.controller.js
│   │   ├── status.controller.js
│   │   └── usuario.controller.js
│   ├── services/
│   │   ├── anotacao.service.js
│   │   ├── categoria.service.js
│   │   ├── lugar.service.js
│   │   ├── status.service.js
│   │   └── usuario.service.js
│   ├── models/
│   │   ├── anotacao.model.js
│   │   ├── categoria.model.js
│   │   ├── lugar.model.js
│   │   ├── status.model.js
│   │   └── usuario.model.js
│   ├── routes/
│   │   ├── anotacao.routes.js        # Rotas aninhadas em /lugares/:id/anotacoes
│   │   ├── anotacaoDireta.routes.js  # Rotas diretas em /anotacoes/:id
│   │   ├── categoria.routes.js
│   │   ├── lugar.routes.js
│   │   ├── status.routes.js
│   │   └── usuario.routes.js
│   └── middleware/
│       ├── logger.js       # Log de requisições no console
│       └── errorHandler.js # Tratamento centralizado de erros
└── frontend/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        ├── api/
        │   ├── client.js
        │   ├── anotacoes.api.js
        │   ├── categorias.api.js
        │   ├── lugares.api.js
        │   ├── status.api.js
        │   └── usuarios.api.js
        ├── services/
        │   ├── anotacoes.service.js
        │   ├── categorias.service.js
        │   ├── lugares.service.js
        │   ├── status.service.js
        │   └── usuarios.service.js
        ├── state/
        │   └── store.js
        └── ui/
            ├── anotacoes.ui.js
            ├── categorias.ui.js
            ├── feedback.js
            ├── lugares.ui.js
            ├── modal.js
            └── usuarios.ui.js
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v22 ou superior (necessário para `node:sqlite` nativo)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/wannago.git
cd wannago
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
node server.js
```

O terminal vai exibir:

```
🌍 WannaGo API rodando em http://localhost:3000
```

### 4. Abra o frontend

Abra o arquivo `frontend/index.html` diretamente no navegador **ou** sirva com uma extensão como o Live Server (VS Code).

> ⚠️ O frontend consome a API em `http://localhost:3000/api`. Certifique-se de que o backend está rodando antes de abrir a página.

---

## 🗄️ Banco de Dados

O banco é criado automaticamente no primeiro `node server.js`. Não é necessária nenhuma configuração manual.

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `categorias` | Tipos de destino (Praia, Cidade, Natureza, Cultural) |
| `status` | Etapas da jornada (sonho, planejando, visitado) |
| `usuarios` | Perfis de usuário |
| `lugares` | Destinos cadastrados, com FK para categoria, status e usuário |
| `anotacoes` | Anotações vinculadas a um lugar (CASCADE com lugar) |

### Seed automático

Na primeira inicialização, o sistema já insere:

- **Categorias:** Praia, Cidade, Natureza, Cultural
- **Status:** sonho, planejando, visitado

---

## 🔗 Endpoints da API

Base URL: `http://localhost:3000/api`

### 📍 Lugares

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/lugares` | Lista todos os lugares |
| GET | `/lugares?status=sonho` | Filtra por status (texto) |
| GET | `/lugares?categoriaId=1` | Filtra por categoria |
| GET | `/lugares?usuarioId=1` | Filtra por usuário |
| GET | `/lugares/:id` | Busca lugar por ID |
| POST | `/lugares` | Cria um novo lugar |
| PUT | `/lugares/:id` | Atualiza um lugar |
| DELETE | `/lugares/:id` | Remove um lugar |

**Body para POST/PUT:**
```json
{
  "nome": "Chapada Diamantina",
  "pais": "Brasil",
  "status": "sonho",
  "categoriaId": 3,
  "usuarioId": 1,
  "imagemUrl": "https://..."
}
```

---

### 👤 Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/:id` | Busca usuário por ID |
| POST | `/usuarios` | Cria um novo usuário |
| PUT | `/usuarios/:id` | Atualiza um usuário |
| DELETE | `/usuarios/:id` | Remove usuário (e seus lugares) |

**Body para POST/PUT:**
```json
{
  "nome": "Sara",
  "email": "sara@gmail.com"
}
```

> Ao remover um usuário, todos os lugares vinculados a ele são removidos automaticamente (`ON DELETE CASCADE`).

---

### 🗂️ Categorias

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/categorias` | Lista todas as categorias |
| GET | `/categorias/:id` | Busca por ID |
| POST | `/categorias` | Cria uma categoria |
| PUT | `/categorias/:id` | Atualiza uma categoria |
| DELETE | `/categorias/:id` | Remove uma categoria |

**Body:**
```json
{ "nome": "Aventura" }
```

---

### 🚦 Status

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/status` | Lista todos os status |
| GET | `/status/:id` | Busca por ID |
| POST | `/status` | Cria um status |
| PUT | `/status/:id` | Atualiza um status |
| DELETE | `/status/:id` | Remove um status |

**Body:**
```json
{ "descricao": "favorito" }
```

---

### 📝 Anotações

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/lugares/:lugarId/anotacoes` | Lista anotações de um lugar |
| POST | `/lugares/:lugarId/anotacoes` | Cria anotação em um lugar |
| GET | `/anotacoes/:id` | Busca anotação por ID |
| PUT | `/anotacoes/:id` | Atualiza uma anotação |
| DELETE | `/anotacoes/:id` | Remove uma anotação |

**Body para POST/PUT:**
```json
{ "texto": "Melhor época para visitar: julho." }
```

---

## 🧩 Classes do Domínio

### 📍 Lugar
Entidade central do sistema. Representa um destino que o usuário deseja visitar, está planejando ou já visitou.

### 🗂️ Categoria
Classifica o tipo do destino — Praia, Cidade, Natureza ou Cultural.

### 🚦 Status
Indica em qual etapa o lugar se encontra na jornada do usuário: **sonho**, **planejando** ou **visitado**.

### 📝 Anotação
Registra observações e memórias que o usuário faz sobre um lugar específico.

### 👤 Usuário
Representa a pessoa que utiliza o sistema e organiza sua própria lista de destinos.

---

## 🔗 Relações entre as Classes

```
Usuario ──── Lugar ──── Categoria
               │
               └──── Status
               │
               └──── Anotacao
```

| Relação | Tipo | Descrição |
|---------|------|-----------|
| Lugar → Categoria | Associação | Um lugar pertence a uma categoria |
| Lugar → Status | Associação | Um lugar tem um status |
| Lugar → Anotação | Composição | Anotações dependem do lugar (removidas junto) |
| Usuário → Lugar | Agregação | Usuário tem lugares; ao remover o usuário, seus lugares também são removidos |

---

## 🏗️ Arquitetura

O backend segue o padrão **MVC em camadas**:

- **Routes** — definem os endpoints e delegam ao controller
- **Controllers** — recebem a requisição, chamam o service e devolvem a resposta
- **Services** — contêm as regras de negócio e validações
- **Models** — executam as queries SQL e mapeiam os dados (snake_case → camelCase)

O frontend também é organizado em camadas:

- **api/** — chamadas HTTP (fetch wrapper)
- **services/** — normalização dos dados antes de enviar
- **state/store.js** — estado global da aplicação (com persistência via `localStorage`)
- **ui/** — renderização dos componentes na tela

---

## ✅ Validações implementadas

- Nome e país obrigatórios ao criar um lugar
- E-mail único e com formato válido para usuários
- Status e categoria devem existir no banco antes de serem associados
- Texto obrigatório ao criar ou atualizar uma anotação
- Nome de categoria capitalizado automaticamente
- Descrição de status salva em minúsculas
