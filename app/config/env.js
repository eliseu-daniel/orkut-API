require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbConfig: {
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        host: process.env.ORACLE_HOST,
        port: process.env.ORACLE_PORT,
        database: process.env.ORACLE_DATABASE
    }
};