const pool = require('../database/pool');

class NotificationRepository {
    async create(notif) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO NOTIFICACOES (NOT_ID, USU_ID, NOT_TIPO, MENS_ID, NOT_DATA, NOT_STATUS)
        VALUES (:id, :usuId, :tipo, :mensId, SYSTIMESTAMP, :status)
      `;
            const binds = {
                id: notif.id,
                usuId: notif.usuId,
                tipo: notif.tipo,
                mensId: notif.mensId,
                status: notif.status
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new NotificationRepository();