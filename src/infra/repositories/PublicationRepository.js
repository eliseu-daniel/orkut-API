const pool = require('../database/pool');

class PublicationRepository {
    async create(pub) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO PUBLICACOES (PUB_ID, USU_ID, PUB_TEXTO, PUB_DATA, PUB_STATUS)
        VALUES (:id, :usuId, :texto, SYSTIMESTAMP, :status)
      `;
            const binds = { id: pub.id, usuId: pub.usuId, texto: pub.texto, status: pub.status };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new PublicationRepository();