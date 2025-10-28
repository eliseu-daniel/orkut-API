const pool = require('../database/pool');

class ActionPublicationRepository {
    async create(data) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO ACOES_PUBLICACOES (USU_ID, AC_ID, AP_DATA, PUB_ID, AP_ID)
        VALUES (:usuId, :acId, SYSTIMESTAMP, :pubId, :apId)
      `;
            const binds = { usuId: data.usuId, acId: data.acId, pubId: data.pubId, apId: data.apId };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new ActionPublicationRepository();