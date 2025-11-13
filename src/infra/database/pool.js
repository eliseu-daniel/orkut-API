const oracledb = require('oracledb');

let pool;

async function createPool() {
    if (pool) return pool;

    const config = {
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECT_STRING,
    };

    console.log('Conectando com:', config.connectString);

    pool = await oracledb.createPool(config);
    console.log(`Pool Oracle (${process.env.NODE_ENV}) criado`);
    return pool;
}

module.exports = { createPool, getConnection: () => pool.getConnection() };