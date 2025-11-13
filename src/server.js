const express = require('express');
const { port } = require('../app/config/env.js');
const { createPool } = require('./infra/database/pool');
const cors = require('cors');
const RealtimeServer = require('./infra/websocket/WebSocketServer');
const createRoutes = require('./interfaces/https/routes/index');
const CommentRepository = require('./infra/repositories/CommentRepository');
const NotificationRepository = require('./infra/repositories/NotificationRepository');

const app = express();
const http = require('http');
const server = http.createServer(app);
const realtime = new RealtimeServer(server);
const commentRepository = new CommentRepository(realtime);
const notificationRepository = new NotificationRepository(realtime);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = createRoutes(realtime);
app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

async function startServer() {
  try {
    await createPool();
    server.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
      console.log(`WebSocket: ws://localhost:${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);

    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw err;
    }
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado:', err);
  process.exit(1);
});

module.exports = { startServer };