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

## Testes
Você pode testar os endpoints da API usando ferramentas como Postman, Insomnia ou até curl. Abaixo estão os principais endpoints e exemplos de requisições com JSON.

### 1. Usuários
- Listar todos os usuários
```GET /users```

- Buscar usuário por ID
```GET /users/:id```.  
Headers:
  Authorization: Bearer <seu_token>

- Atualizar usuário
```PUT /users/:id```.  
Headers:
  Authorization: Bearer <seu_token>.   

Body (JSON):
```json
{
  "name": "Novo Nome",
  "email": "novoemail@email.com",
  "password": "novaSenha123"
}
```

- Deletar usuário
```DELETE /users/:id```.

Headers:
  Authorization: Bearer <seu_token>

### 2. Listas de Propriedades
- Criar lista de propriedades
```POST /users/:userId/property-lists```.

Body (JSON):
```json
{
  "name": "Minha Lista de Imóveis"
}
```

- Listar todas as listas de um usuário
```GET /users/:userId/property-lists```

- Buscar lista por ID
```GET /users/:userId/property-lists/:listId```.

Headers:
  Authorization: Bearer <seu_token>

- Atualizar lista de propriedades
```PUT /users/:userId/property-lists/:listId```.  
Headers:
  Authorization: Bearer <seu_token>.
  
Body (JSON):
```json
{
  "name": "Nome Atualizado da Lista"
}
```

- Deletar lista de propriedades
```DELETE /users/:userId/property-lists/:listId```.

Headers:
  Authorization: Bearer <seu_token>

### 3. Propriedades
- Criar propriedade
```POST /users/:userId/property-lists/:listId/properties```.

Body (JSON):
```json
{
  "title": "Apartamento 2 quartos",
  "price": 250000,
  "adress": "Rua Exemplo, 123",
  "url": "http://linkdaprop.com",
  "comments": "Ótima localização"
}
```

- Listar todas as propriedades de uma lista
```GET /users/:userId/property-lists/:listId/properties```

- Buscar propriedade por ID
```GET /users/:userId/property-lists/:listId/properties/:propId```

- Atualizar propriedade
```PUT /users/:userId/property-lists/:listId/properties/:propId```.

Headers:
  Authorization: Bearer <seu_token>.
  
Body (JSON):
```json
{
  "title": "Apartamento 3 quartos",
  "price": 300000,
  "adress": "Rua Exemplo, 456",
  "url": "http://linkdaprop.com",
  "comments": "Renovado recentemente"
}
```

- Deletar propriedade
```DELETE /users/:userId/property-lists/:listId/properties/:propId```.

Headers:
  Authorization: Bearer <seu_token>

### Autenticação Opcional
A API possui endpoints para registro e login, que permitem criar usuários e gerar o JWT necessário para acessar endpoints protegidos, incentivando o cadastro para persistência dos dados.

### 1. Registrar usuário
```POST /register```.  

Body (JSON):
```json
{
  "name": "Seu Nome",
  "email": "seuemail@email.com",
  "password": "senha123"
}
```

Resposta esperada:
```json
{
  "id": "uuid-do-usuario",
  "name": "Seu Nome",
  "email": "seuemail@email.com",
  "role": "lead"
}
```

### 2. Login
```POST /login```.  

Body (JSON):
```json
{
  "email": "seuemail@email.com",
  "password": "senha123"
}
```

Resposta esperada:
```json
{
  "token": "<JWT_GERADO>"
}
```

💡 Use o token retornado no cabeçalho Authorization: Bearer <token> para acessar endpoints protegidos como /users/:id, /property-lists/:listId, etc.

## Limitações e Implementações futuras
- Implementar sistema de comparação de imóveis.
- Adicionar notificações automáticas e sugestões.
- Criar endpoints colaborativos (listas compartilhadas).
- Integrar com WhatsApp para captação de leads.
