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
            return { inserted: result.rows.map(row => this.#mapRowToPublication(row)) };
        } finally {
            if (connection) await connection.close();
        }
    }

    async getAllPublications() {
        const connection = await pool.getConnection();
        try {
            const sql = `
                SELECT 
                P.PUB_ID         AS id, 
                P.USU_ID         AS usuId, 
                P.PUB_TEXTO      AS texto, 
                P.PUB_DATA       AS data, 
                P.PUB_STATUS     AS status,
                U.USU_NOME       AS nome
                FROM PUBLICACOES P
                INNER JOIN USUARIO U 
                    ON P.USU_ID = U.USU_ID
                ORDER BY P.PUB_DATA DESC
      `;
            const result = await connection.execute(sql);
            return result.rows.map(row => this.#mapRowToPublication(row));
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
            return result.rows.map(row => this.#mapRowToPublication(row));
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapRowToPublication(row) {
        return {
            id: row[0],
            usuId: row[1],
            texto: row[2],
            data: row[3],
            status: row[4],
            nome: row[5]
        };
    }
}

module.exports = new PublicationRepository();