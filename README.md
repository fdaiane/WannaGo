# 🌍 WannaGo

> *Organize os lugares que você sonha, planeja e já visitou — tudo em um só lugar.*

---

## ✈️ Sobre o Projeto

- Quantas vezes você pensou "um dia eu vou lá" e esqueceu? O **WannaGo** resolve isso.
É uma aplicação fullstack para você montar sua lista pessoal de destinos, acompanhar
sua jornada de viajante e guardar memórias de cada lugar.

---

## 🛠️ Tecnologias
- Node.js + Express (API REST)
- HTML, CSS, Bootstrap (Frontend)
- MySQL (Banco de dados)

---

## 🧩 Classes do Domínio

### 📍 Lugar
- Entidade central do sistema. Representa um destino que o usuário deseja visitar, está planejando ou já visitou.

### 🗂️ Categoria
- Classifica o tipo do destino, como praia, cidade, natureza ou cultural.

### 🚦 Status
- Indica em qual etapa o lugar se encontra na jornada do usuário: sonho, planejando ou visitado.

### 📝 Anotacao
- Registra observações e memórias que o usuário faz sobre um lugar específico.

### 👤 Usuario
- Representa a pessoa que utiliza o sistema e organiza sua própria lista de destinos.

---

## 🔗 Relações entre as Classes
- Lugar → Categoria: **Associação** (um lugar pertence a uma categoria)
- Lugar → Status: **Associação** (um lugar tem um status)
- Lugar → Anotacao: **Composição** (anotações dependem do lugar)
- Usuario → Lugar: **Agregação** (usuário tem lugares, mas lugar existe independente)