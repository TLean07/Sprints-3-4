<h1 align="center">Passa a Bola</h1>
<p align="center">Sprints 3 e 4</p>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Linguagem-TypeScript-informational.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Framework-Tailwind_CSS-06B6D4.svg" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Banco_de_Dados-Firebase_Auth-FFCA28.svg" alt="Firebase Auth">
  <img src="https://img.shields.io/badge/Banco_de_Dados-Firebase_Realtime-F57C00.svg" alt="Firebase Realtime Database">
  <img src="https://img.shields.io/badge/Framework-Framer_Motion-purple.svg" alt="Framer Motion">
</p>

> `Passa a Bola` é uma Single Page Application (SPA) moderna e responsiva, dedicada a cobrir o universo do futebol feminino. O projeto foi desenvolvido com uma arquitetura robusta em React e TypeScript, utilizando Firebase para autenticação e banco de dados, e uma interface de usuário visualmente impactante, criada com Tailwind CSS e Framer Motion.

---

### 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Como Executar](#-como-executar)
- [👥 Integrantes do Grupo](#-integrantes-do-grupo)

---

### 📖 Sobre o Projeto

O projeto **Passa a Bola** é a materialização de uma plataforma completa para fãs do futebol feminino. A aplicação foi concebida para ser não apenas funcional, mas também visualmente agradável e intuitiva, demonstrando a aplicação de bibliotecas de ponta para criar uma experiência de usuário de alta qualidade.

O site oferece informações dinâmicas sobre notícias, jogos e transferências, combinando dados de uma API externa (NewsAPI) com um banco de dados em tempo real (Firebase Realtime Database). A autenticação de usuários é gerenciada pelo Firebase Authentication, garantindo uma área protegida para o perfil do usuário.

O design foi uma prioridade, utilizando uma paleta de cores moderna, tipografia expressiva e microinterações com **Framer Motion** para dar vida à interface. O resultado é um produto que se destaca pela sua fluidez e profissionalismo.

---

### ✨ Funcionalidades

- **Autenticação de Usuários:** Login e registro com email/senha e Google, gerenciados pelo Firebase Auth.
- **Roteamento Inteligente:** Navegação fluida com React Router DOM, incluindo rotas aninhadas e proteção de rotas para o perfil do usuário.
- **Feed de Notícias:** Consumo dinâmico de notícias sobre futebol feminino a partir de uma API externa (NewsAPI).
- **Dados Dinâmicos:** Exibição de jogos e transferências em tempo real, gerenciados pelo Firebase Realtime Database.
- **Gerenciamento de Perfil:** Os usuários podem visualizar e editar suas informações pessoais e foto de perfil.
- **Inscrição para Campeonatos:** Formulário de coleta de dados seguro, que armazena as inscrições no Firebase.
- **Design Moderno:** Interface de usuário construída com **Tailwind CSS**, com animações sofisticadas via **Framer Motion** para uma experiência premium.

---

### 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Front-end** | **React** | Biblioteca principal para a interface do usuário. |
| | **TypeScript**| Linguagem de programação para tipagem estática. |
| | **React Router DOM**| Gerenciamento de roteamento e navegação entre páginas. |
| | **Tailwind CSS** | Framework de CSS utility-first para estilização rápida e responsiva. |
| | **Framer Motion**| Biblioteca para animações e transições. |
| | **React Hot Toast**| Notificações de feedback elegantes e fáceis de usar. |
| | **Lucide React** | Biblioteca de ícones moderna e leve. |
| **Back-end/BaaS**| **Firebase** | Conjunto de serviços (Auth, Realtime Database, Storage) para backend-as-a-service. |
| **APIs**| **NewsAPI** | API externa para buscar notícias sobre futebol. |

---

### 📁 Estrutura do Projeto

O projeto está organizado de forma modular para facilitar a manutenção e o desenvolvimento de novas funcionalidades.

```
passa-a-bola/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layouts/
│   │   └── modules/
│   │   └── ui/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

### 🔧 Como Executar

Para rodar o projeto localmente, siga os passos abaixo.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/TLean07/Sprints-3-4.git](https://github.com/TLean07/Sprints-3-4.git)
    cd Passa-Bola
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Firebase e a NewsAPI:**
    * Crie um projeto no Firebase e configure a autenticação (email/senha, Google), Realtime Database e Storage.
    * Adicione as chaves de API do Firebase no arquivo `.env` do projeto.
    * Obtenha uma chave da NewsAPI e adicione-a ao `.env`.

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

---

### 👥 Integrantes do Grupo

| Nome                               | RM | GitHub                                                |
| ---------------------------------- | ------------------ | ----------------------------------------------------- |
| Leandro Afonso Silva Santos Júnior | 561344 | [TLean07](https://github.com/TLean07)                 |
| Lucas Mesquita Massoni             | 561686 | [lucasmassoni06](https://github.com/lucasmassoni06)   |
| Luigi Escudero Grigoletto          | 562505 | [Lueg2007](https://github.com/Lueg2007)               |
| Guilherme Barone Milani            | 562114 | [GuilhermeBM3012](https://github.com/GuilhermeBM3012) |
| Felipe Balbino Murad               | 562347 | [FelipeM211](https://github.com/FelipeM211)           |