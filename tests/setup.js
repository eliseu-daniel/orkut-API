const { app, startServer } = require('../src/server');
const { getConnection } = require('../src/infra/database/pool');
const oracledb = require('oracledb');

let server;
let serverStarted = false;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    if (!serverStarted) {
        server = await startServer();
        serverStarted = true;
        console.log('Servidor de teste iniciado na porta 3001');
    }

    const conn = await getConnection();
    try {
        await conn.execute(`DELETE FROM COMENTARIOS_PUBLICACAO`);
        await conn.execute(`DELETE FROM MENSAGENS`);
        await conn.execute(`DELETE FROM NOTIFICACOES`);
        await conn.execute(`DELETE FROM ACOES`);
        await conn.execute(`DELETE FROM PUBLICACOES`);
        await conn.execute(`DELETE FROM USUARIO_GRUPO`);
        await conn.execute(`DELETE FROM GRUPOS`);
        await conn.execute(`DELETE FROM CONTATOS`);
        await conn.execute(`DELETE FROM CONVITES`);
        await conn.execute(`DELETE FROM USUARIO`);
        await conn.commit();
    } finally {
        await conn.close();
    }
}, 30000);

afterAll(async () => {
    if (server) await server.close();

    if (oracledb.getPool()) await oracledb.getPool().close(10);

    try {
        const pool = oracledb.getPool(); 
        if (pool) await pool.close(10);
    } catch (err) {
        if (err.message.includes('NJS-047')) {
            console.log('Pool já fechado ou não existe');
        } else {
            throw err;
        }
    }
});

global.app = app;
global.server = server;