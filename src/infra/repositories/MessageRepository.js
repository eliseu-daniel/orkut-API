const pool = require('../database/pool');

class MessageRepository {
    async create(message) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO MENSAGENS (USU_ID, CONTATO_ID, MENS_DESCRICAO, MENS_STATUS, MENS_DATA)
        VALUES (:usuId, :contatoId, :descricao, :status, SYSTIMESTAMP)
      `;
            const binds = {
                usuId: message.usuId,
                contatoId: message.contatoId,
                descricao: message.descricao,
                status: message.status
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rows };
        } finally {
            if (connection) await connection.close();
        }
    }

    async findByUserAndContact(usuId, contatoId) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        SELECT MENS_ID AS id, USU_ID AS usuId, CONTATO_ID AS contatoId, MENS_DESCRICAO AS descricao, MENS_STATUS AS status, MENS_DATA AS data
        FROM MENSAGENS
        WHERE USU_ID = :usuId AND CONTATO_ID = :contatoId
        ORDER BY MENS_DATA ASC
      `;
            const binds = { usuId, contatoId };
            const oracledb = require('oracledb'); // requerindo aqui para evitar ciclo circular (gambiarra)
            const result = await connection.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows;
        } finally {
            if (connection) await connection.close();
        }
    }

    async findAll() {
        const connection = await pool.getConnection();
        try {
            const sql = `
            SELECT 
                MENS_ID AS id,
                USU_ID AS usuId,
                CONTATO_ID AS contatoId,
                MENS_DESCRICAO AS descricao,
                MENS_STATUS AS status,
                MENS_DATA AS data
            FROM MENSAGENS
            ORDER BY CONTATO_ID ASC, MENS_DATA DESC
        `;

            const oracledb = require('oracledb');
            const result = await connection.execute(
                sql,
                {},
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            const mensagens = result.rows;

            // AGRUPAR POR contatoId
            const agrupado = mensagens.reduce((acc, msg) => {
                if (!acc[msg.CONTATOID]) {
                    acc[msg.CONTATOID] = {
                        contatoId: msg.CONTATOID,
                        mensagens: []
                    };
                }
                acc[msg.CONTATOID].mensagens.push(msg);
                return acc;
            }, {});

            return Object.values(agrupado);

        } finally {
            if (connection) await connection.close();
        }
    }

}

module.exports = new MessageRepository();