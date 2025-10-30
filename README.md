# API com Express + OracleDB

Uma **API RESTful completa** para um sistema social com usuários, publicações, mensagens, ações, grupos, etc, com **Oracle Database** e arquitetura **Clean Architecture**.

---

## Funcionalidades

| Recurso | Endpoint | Descrição |
|--------|----------|----------|
| Usuários | `POST /api/users` | Cria usuário |
| Ações | `POST /api/actions` | Cria ação com imagem (BLOB) |
| Mensagens | `POST /api/messages` | Envia mensagem |
| Publicações | `POST /api/publications` | Cria post |
| Comentários | `POST /api/comments` | Comenta publicação |
| Grupos | `POST /api/groups` | Cria grupo |
| Contatos | `POST /api/contacts` | Adiciona contato |
| Convites | `POST /api/invitations` | Envia convite |
| Notificações | `POST /api/notifications` | Cria notificação |

---

## Estrutura do Projeto (Clean Architecture)
src/

├── app/                     # Casos de uso (lógica de negócio)

│   ├── users/

│   ├── actions/

│   ├── messages/

│   └── ...

│

├── infrastructure/

│   ├── database/

│   │   ├── pool.js          # Pool de conexões Oracle

│   │

│   └── repositories/        # Comunicação com Oracle 
(BLOB incluso)

│       ├── UserRepository.js

│       ├── ActionRepository.js

│       └── ...

│

├── interfaces/

│   └── http/

│       ├── controllers/     # Camada HTTP (Express)

│       ├── routes/          # Rotas organizadas

│       └── middlewares/     # (futuro: auth, validate)

│

├── shared/                  # (futuro: erros, utils, enums)

│

└── server.js                # Entry point

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
```

4. Inicie o Oracle (XE ou seu container)

5. Execute o projeto
```bash
pnpm run dev
```
API disponível em: http://localhost:3000/api