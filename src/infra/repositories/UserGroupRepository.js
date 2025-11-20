const pool = require('../database/pool');

class UserGroupRepository {
    async create(data) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO USUARIO_GRUPO (UG_STATUS, USU_ID, GRU_ID, UG_DATA)
        VALUES (:status, :usuId, :gruId, SYSTIMESTAMP)
      `;
            const binds = { status: data.status, usuId: data.usuId, gruId: data.gruId };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rows };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new UserGroupRepository();