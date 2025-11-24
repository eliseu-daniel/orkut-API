const express = require('express');
const { port, host } = require('../app/config/env.js');
const { createPool } = require('./infra/database/pool');
const cors = require('cors');
const os = require('os');
const RealtimeServer = require('./infra/websocket/WebSocketServer');
const createRoutes = require('./interfaces/https/routes/index');

const app = express();
const http = require('http');
const server = http.createServer(app);
const realtime = new RealtimeServer(server);

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
    server.listen(port, host, () => {
      const ifaces = os.networkInterfaces();
      const localIPs = Object.values(ifaces)
        .flat()
        .filter((iface) => iface.family === 'IPv4' && !iface.internal)
        .map((iface) => iface.address);

      console.log(`API rodando em:`);
      console.log(`   Local: http://localhost:${port}`);
      localIPs.forEach((ip) => console.log(`   Rede:  http://${ip}:${port}`));
      console.log(`WebSocket: ws://${host}:${port}`);
      console.log(`Health check: http://${host}:${port}/health`);
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