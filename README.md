# API com Express + OracleDB

Uma **API RESTful completa** para um sistema social com usuários, publicações, mensagens, ações, grupos, etc, com **Oracle Database** e arquitetura **Clean Architecture**.

---

## Funcionalidades

| Recurso | Endpoint | Descrição |
|--------|----------|----------|
| **🔐 Autenticação** | `POST /api/auth/login` | Login com apelido |
| **👥 Usuários** | `POST /api/users` | Cria usuário |
| **🎯 Ações** | `POST /api/actions` | Ação com imagem **BLOB** |
| **💬 Mensagens** | `POST /api/messages` | Chat **em tempo real** |
| **📝 Publicações** | `POST /api/publications` | Cria post |
| **💭 Comentários** | `POST /api/comments` | Comenta publicação |
| **👥 Grupos** | `POST /api/groups` | Cria grupo |
| **📞 Contatos** | `POST /api/contacts` | Adiciona amigo |
| **✉️ Convites** | `POST /api/invitations` | Envia convite |
| **🔔 Notificações** | `POST /api/notifications` | **Ao vivo via WebSocket** |

## 🌐 Tecnologias

| Tech | Versão | Uso |
|------|--------|-----|
| **Node.js** | >= 18 | Backend |
| **Express** | ^4.18 | API REST |
| **OracleDB** | ^6.0 | Banco + **BLOB** |
| **JWT** | `jsonwebtoken` | Autenticação |
| **WebSocket** | `ws` | Tempo real |
| **Multer** | ^1.4 | Upload imagens |


## 🏗️ Estrutura (Clean Architecture)

---

## Estrutura do Projeto (Clean Architecture)
src/

├── app/                     # 🎯 Casos de uso

├── infrastructure/

│   ├── database/            # 🗄️ Pool Oracle

│   ├── repositories/        # 💾 Oracle + BLOB

│   └── websocket/           # ⚡ WebSocket Server

├── interfaces/http/

│   ├── controllers/         # 🌐 Express

│   ├── routes/              # 📍 Rotas JWT

│   └── middlewares/         # 🔐 Auth JWT

└── server.js                # 🚀 HTTP + WS


---

## Como Rodar

### 1. Clone o repositório
```bash
git clone https://github.com/eliseu-daniel/orkut-API.git
cd orkut-API
```
2. Instale as dependências
```bash
pnpm install
```

3. Configure o .env
```bash
PORT=3000

ORACLE_HOST=localhost
ORACLE_PORT=1521
ORACLE_DATABASE=XE
ORACLE_USER=sys
ORACLE_PASSWORD=masterkey

JWT_SECRET=orkut123_super_secreto_2024
JWT_EXPIRES_IN=7d
```

4. Inicie o Oracle (XE ou seu container)

5. Execute o projeto
```bash
pnpm run dev
```
API disponível em: http://localhost:3000/api
---
💬 WebSocket (Tempo Real)

Conexão
```
const ws = new WebSocket('ws://localhost:3000?userId=USER123');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Mensagem:', data);
};
```
---
Eventos
---
|Evento|Descrição|
|------|---------|
|`nova_mensagem` | Recebeu mensagem|
|`nova_notificacao` | Nova notificação|
|`connected` | WebSocket conectado|
---
