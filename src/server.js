const express = require('express');
const { port } = require('../app/config/env.js');
const routes = require('./interfaces/http/routes/index');
const { createPool } = require('./infrastructure/database/pool');
const cors = require('cors');

app.use(cors());

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

async function startServer() {
  try {
    await createPool();
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();

process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado:', err);
  process.exit(1);
});