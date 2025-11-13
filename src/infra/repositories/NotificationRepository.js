const pool = require('../database/pool');

class NotificationRepository {
    constructor(realtime) {
        this.realtime = realtime;
    }
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

            realtime.sendToUser(notif.usuId, {
                type: 'nova_notificacao',
                data: {
                    id: notif.id,
                    tipo: notif.tipo,
                    mensagem: `Nova ${notif.tipo.toLowerCase()}`
                }
            });

            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = NotificationRepository;