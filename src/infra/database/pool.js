const oracledb = require('oracledb');
const { dbConfig } = require('../../app/config/env');

let pool;

async function createPool() {
    if (!pool) {
        pool = await oracledb.createPool({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: `${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
            poolMin: 2,
            poolMax: 10,
            poolIncrement: 1
        });
        console.log('Pool Oracle criado com sucesso');
    }
    return pool;
}

module.exports = { getConnection: () => createPool().then(p => p.getConnection()) };