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

    async getAllPublications() {
        const connection = await pool.getConnection();
        try {
            const sql = `
        SELECT PUB_ID AS id, USU_ID AS usuId, PUB_TEXTO AS texto, PUB_DATA AS data, PUB_STATUS AS status
        FROM PUBLICACOES
        ORDER BY PUB_DATA DESC
      `;
            const result = await connection.execute(sql);
            return result.rows;
        } finally {
            if (connection) await connection.close();
        }
    }

    async findByUserId(usuId) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        SELECT PUB_ID AS id, USU_ID AS usuId, PUB_TEXTO AS texto, PUB_DATA AS data, PUB_STATUS AS status
        FROM PUBLICACOES
        WHERE USU_ID = :usuId
        ORDER BY PUB_DATA DESC
      `;
            const binds = { usuId };
            const result = await connection.execute(sql, binds);
            return result.rows;
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new PublicationRepository();