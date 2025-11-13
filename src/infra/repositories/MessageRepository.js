const pool = require('../database/pool');

class MessageRepository {
    async create(message) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO MENSAGENS (MENS_ID, USU_ID, CONTATO_ID, MENS_DESCRICAO, MENS_STATUS, MENS_DATA)
        VALUES (:id, :usuId, :contatoId, :descricao, :status, SYSTIMESTAMP)
      `;
            const binds = {
                id: message.id,
                usuId: message.usuId,
                contatoId: message.contatoId,
                descricao: message.descricao,
                status: message.status
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
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
            const result = await connection.execute(sql, binds, { outFormat: pool.oracledb.OUT_FORMAT_OBJECT });
            return result.rows;
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new MessageRepository();