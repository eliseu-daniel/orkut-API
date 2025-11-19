const pool = require('../database/pool');

class CommentRepository {
    constructor(realtime) {
        this.realtime = realtime;
    }

    async create(message) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO MENSAGENS (MENS_ID, USU_ID, CONTATO_ID, MENS_DESCRICAO, MENS_STATUS, MENS_DATA)
        VALUES (:id, :usuId, :contatoId, :descricao, :status, SYSTIMESTAMP)`;
            const binds = {
                id: message.id,
                usuId: message.usuId,
                contatoId: message.contatoId,
                descricao: message.descricao,
                status: message.status
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });

            realtime.sendToUser(message.contatoId, {
                type: 'nova_mensagem',
                data: {
                    id: message.id,
                    de: message.usuId,
                    texto: message.descricao,
                    data: new Date().toISOString()
                }
            });

            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }

    async getAll() {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT MENS_ID AS id, USU_ID AS usuId, CONTATO_ID AS contatoId, 
                MENS_DESCRICAO AS descricao, MENS_STATUS AS status, MENS_DATA AS data FROM MENSAGENS`;
            const result = await connection.execute(sql, {}, { outFormat: pool.OBJECT });
            return result.rows;
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = CommentRepository;