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
            return { inserted: result.rows.map(row => this.#mapToModel(row)) };
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapToModel(row) {
        return {
            usuId: row.USU_ID,
            acId: row.AC_ID,
            apData: row.AP_DATA,
            pubId: row.PUB_ID,
            apId: row.AP_ID,
        };
    }
}

module.exports = new ActionPublicationRepository();