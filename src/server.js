require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
  override: true
});

const express = require('express');
const { port } = require('../app/config/env.js');
const routes = require('./interfaces/https/routes/index');
const { createPool } = require('./infra/database/pool');
const cors = require('cors');
const RealtimeServer = require('./infra/websocket/WebSocketServer');

const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const realtime = new RealtimeServer(server);

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
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado:', err);
  process.exit(1);
});

module.exports = { app, server, realtime, startServer };