const pool = require('../database/pool');

class ActionMessageRepository {
    async create(data) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO ACOES_MENSAGEM (AC_ID, MENS_ID, AM_DATA, AM_ID)
        VALUES (:acId, :mensId, SYSTIMESTAMP, :amId)
      `;
            const binds = { acId: data.acId, mensId: data.mensId, amId: data.amId };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new ActionMessageRepository();