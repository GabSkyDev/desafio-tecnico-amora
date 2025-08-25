# Desafio Técnico aMORA

## Descrição
MVP inicial do backend para o desafio técnico da aMORA.  
O projeto tem como objetivo fornecer uma API para gerenciamento de imóveis, permitindo que usuários e corretores armazenem e acessem seus imóveis via endpoints REST.  
Alguns endpoints possuem autenticação via JWT (incentivando registro posterior).

## Status do Projeto
Alguns requisitos não foram implementados ou estão parcialmente concluídos.  
A entrega prioriza apresentar a arquitetura, endpoints principais e um fluxo básico de autenticação.

## Stack Utilizada
- **Node.js** com **Express**
- **TypeScript**
- **JWT** para autenticação
- **PostgreSQL** para persistência de dados

## Passo a Passo para Rodar o Projeto
### Pré-requisitos
- Node.js (>= 18.x)
- NPM ou Yarn
- PostgreSQL em execução local ou remoto

### Clonando o repositório
```bash
git clone https://github.com/seu-usuario/desafio-tecnico-amora.git
cd desafio-tecnico-amora
```

### Instalando as dependências
```bash
npm install
```

### Configurando variáveis de ambiente

Crie um arquivo .env na raiz do projeto com os seguintes parâmetros:

```
JWT_SECRET=sua_chave_secreta
PORT=3000
```

### Executando o servidor
```
npm run dev
```

## Decisões Técnicas e de Produto

- **Uso do Express com TypeScript:**
Escolhido por sua leveza e flexibilidade para montar rapidamente uma API RESTful.

- **JWT para autenticação:**
Permite endpoints seguros para criação, listagem e gerenciamento de imóveis de usuários e corretores.
E incentiva que novos usuários se registrem para acessar novas funcionalidades como atualização ou deleção.

- **PostgreSQL:**
Banco relacional que oferece robustez e escalabilidade para dados transacionais de imóveis.

- **Estrutura Modular:**
Divisão em rotas, controllers e services para melhor manutenção.


## Limitações e Implementações futuras
- Implementar sistema de comparação de imóveis.
- Adicionar notificações automáticas e sugestões.
- Criar endpoints colaborativos (listas compartilhadas).
- Integrar com WhatsApp para captação de leads.
