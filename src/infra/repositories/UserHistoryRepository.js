const pool = require('../database/pool');

class UserHistoryRepository {
    async create(history) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO HISTORICO_USUARIO (HIS_ID, USU_ID, HIS_DATA, TOTAL_MENSAGENS, TOTAL_COMENTARIOS, TOTAL_PUBLICACOES)
        VALUES (:id, :usuId, SYSTIMESTAMP, :mensagens, :comentarios, :publicacoes)
      `;
            const binds = {
                id: history.id,
                usuId: history.usuId,
                mensagens: history.mensagens,
                comentarios: history.comentarios,
                publicacoes: history.publicacoes
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rows };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new UserHistoryRepository();