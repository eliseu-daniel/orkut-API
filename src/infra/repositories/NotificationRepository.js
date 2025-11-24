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

            return { inserted: result.rows };
        } finally {
            if (connection) await connection.close();
        }
    }

    async findUser(userId) {
        const connection = await pool.getConnection();
        try {
            const sql = `
                    SELECT NOT_ID AS id, USU_ID AS usuId, NOT_TIPO AS tipo, MENS_ID AS mensId, NOT_DATA AS data, NOT_STATUS AS status
                    FROM NOTIFICACOES
                    WHERE USU_ID = :userId
                    ORDER BY NOT_DATA DESC
                `;
            const result = await connection.execute(sql, { userId });
            return result.rows.map(row => this.#mapRowToNotification(row));
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapRowToNotification(row) {
        return {
            id: row[0],
            usuId: row[1],
            tipo: row[2],
            mensId: row[3],
            data: row[4],
            status: row[5]
        };
    }
}

module.exports = NotificationRepository;