# Virtu Store - High-End Fashion E-commerce

A **Virtu Store** é uma plataforma de e-commerce de moda de luxo (*high-end*). O objetivo é demonstrar a implementação de uma interface moderna, performática e escalável, utilizando as melhores práticas do ecossistema React.

O projeto foca na experiência do usuário (*UX*) com um design minimalista, transições suaves e um sistema robusto de internacionalização e persistência de dados.

---

## 🚀 Tecnologias e Conceitos Utilizados

Este projeto foi construído utilizando uma stack moderna para garantir performance e manutenibilidade:

### 🛠 Core
- **Node.js 20**: Versão LTS utilizada para o ambiente de desenvolvimento.
- **React 19**: Versão mais recente do React para construção da UI.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Vite**: Build tool extremamente rápida para o desenvolvimento frontend.

### 🎨 Design e UI
- **Tailwind CSS v4**: Utilizado para uma estilização utilitária e responsiva, com customização via `@theme` e animações nativas.
- **Responsividade Total**: Layout adaptável para dispositivos mobile, tablets e desktops ultra-wide.
- **Animações Premium**: Transições suaves e efeitos de micro-interação para uma sensação de luxo.
- **Ícones Customizados**: Todos os ícones foram externalizados em arquivos SVG para melhor performance e customização.

### ⚙️ Funcionalidades Técnicas
- **TanStack Query (React Query) v5**: Gerenciamento de estado assíncrono, cache inteligente e sincronização com a API.
- **Zustand**: Gerenciamento de estado global (Carrinho de Compras) com persistência automática no `localStorage`.
- **i18next**: Sistema completo de internacionalização com suporte a 6 idiomas (PT, EN, ES, FR, DE, RU) e detecção automática/persistência da língua preferida do usuário.
- **Zod**: Validação de schemas e contratos de dados da API em tempo de execução.
- **Axios**: Cliente HTTP para consumo de serviços.
- **JSON Server v1**: Utilizado como backend mock para simular uma API REST real com suporte a paginação e filtros avançados.

---

## 📦 Funcionalidades Principais

1.  **Listagem de Produtos com Paginação**: Carregamento eficiente de produtos (8 por página) com navegação fluida.
2.  **Busca em Tempo Real**: Filtro de pesquisa case-insensitive direto no nome dos produtos.
3.  **Filtro por Categorias**: Alternância rápida entre categorias (Man, Woman, Child) com integração total à paginação.
4.  **Carrinho de Compras Persistente**: Adição, remoção e alteração de quantidade de produtos, com dados salvos entre sessões do navegador.
5.  **Internacionalização Dinâmica**: Troca de idioma instantânea que afeta toda a interface, inclusive categorias e mensagens de feedback.
6.  **Página de Detalhes**: Visualização aprofundada de cada produto com animações de carregamento (*Skeletons*).
7.  **Toast System**: Feedback visual ao adicionar itens ao carrinho.

---

## 🛠 Como Rodar o Projeto

Siga os passos abaixo para configurar o ambiente e rodar o projeto localmente:

### Pré-requisitos
- Node.js **20.x** ou superior
- npm ou yarn

### 1. Clone o Repositório
```bash
# SSH
git clone git@github.com:jonathanoliveirarocha/virtu-store.git

# Ou HTTPS
git clone https://github.com/jonathanoliveirarocha/virtu-store.git

cd virtu-store
```

### 2. Configurar o Backend (Mock API)
O backend utiliza o `json-server` para simular as rotas de produtos.
```bash
cd backend
npm install
npm run dev
```
O servidor rodará em `http://localhost:3000`.

### 3. Configurar o Frontend

Na pasta do frontend, crie um arquivo ".env" conforme o modelo do arquivo "./frontend/.env.example" (pode utilizar as mesmas variáveis e valores).

Abra um novo terminal na raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```
O frontend estará disponível em `http://localhost:9100/app`.

---

## 📄 Estrutura de Pastas Relevante

- `frontend/src/api`: Configuração do Axios e wrappers de requisição.
- `frontend/src/services`: Camada de serviços que consome a API e valida dados com Zod.
- `frontend/src/store`: Gerenciamento de estado global com Zustand (Cart Store).
- `frontend/src/hooks`: Hooks customizados para abstrair lógica de busca e dados.
- `frontend/src/lib/locales`: Arquivos JSON de tradução para i18n.
- `frontend/src/utils`: Utilitários como construtor de parâmetros de URL e formatadores.

---

## 🌟 Intuito do Projeto
Este repositório foi criado para demonstrar proficiência em:
- Arquitetura de aplicações React modernas.
- Consumo de APIs RESTful com tratamento de estados de erro e loading.
- Implementação de layouts complexos e responsivos com Tailwind CSS.
- Gestão de estado e persistência de dados no lado do cliente.
- Internacionalização e boas práticas de acessibilidade.
