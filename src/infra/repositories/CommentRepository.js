const pool = require('../database/pool');

class CommentRepository {
    async create(comment) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO COMENTARIOS_PUBLICACAO (PUB_ID, USU_ID, AP_TEXTO, CP_DATA, CP_ID)
        VALUES (:pubId, :usuId, :texto, SYSTIMESTAMP, :cpId)
      `;
            const binds = {
                pubId: comment.pubId,
                usuId: comment.usuId,
                texto: comment.texto,
                cpId: comment.cpId
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new CommentRepository();