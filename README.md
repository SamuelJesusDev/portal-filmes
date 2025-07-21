# Portal de Filmes

## Sobre o Projeto

Portal web moderno para navegação em catálogo de filmes com dados da API TMDB. Desenvolvido com Nuxt 3, oferece experiência fluida e responsiva para visualizar detalhes, avaliações de filmes.

## Tecnologias

- **Nuxt 3** - Framework full-stack com SSR e rotas automáticas
- **Vue 3 + TypeScript** - Framework reativo com tipagem estática  
- **Pinia** - Gerenciador de estado
- **TMDB API** - Dados de filmes e trailers
- **Bootstrap CSS** - Estilização responsiva
- **Autenticação** - Controle via localStorage

## Funcionalidades

- Catálogo de filmes dinâmico
- Detalhes e avaliações
- Sistema de login e favoritos
- Layout responsivo

## Pré-requisitos

- **Node.js** 18.x+
- **Git**
- Gerenciador de pacotes (npm/yarn)

```bash
node --version
npm --version
```

## Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/SamuelJesusDev/portal-filmes.git
cd portal-filmes

# Instale dependências
npm install
# ou
yarn install

# Execute em desenvolvimento
npm run dev
# ou  
yarn dev
```

**Aplicação:** http://localhost:3000  
**Login:** usuário `admin` / senha `123`

## Scripts

| Script | Descrição |
|--------|-----------|
| `dev` | Servidor de desenvolvimento |
| `build` | Build de produção |
| `preview` | Preview do build local |

## Sugestões de Melhorias Futuras

### Funcionais
-  Autenticação real (Firebase/Auth0)
-  Favoritos persistentes por usuário
-  Busca avançada com filtros
-  Suporte multilíngue (i18n)

### Técnicas  
- Adicionar testes automatizados
- Segurança aprimorada
---