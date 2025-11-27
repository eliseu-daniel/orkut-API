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

    async getByUserId(userId) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        SELECT UG.GRU_ID, UG.UG_STATUS, UG.UG_DATA, G.GRU_ID, G.GRU_NOME, G.GRU_DESCRICAO, G.GRU_STATUS
        FROM USUARIO_GRUPO UG
        JOIN GRUPOS G ON UG.GRU_ID = G.GRU_ID
        WHERE UG.USU_ID =:userId
      `;
            const binds = { userId };

            const oracledb = require('oracledb');
            const result = await connection.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows.map(row => this.#maptoModel(row));
        } finally {
            if (connection) await connection.close();
        }
    }

    #maptoModel(row) {
        return {
            groupId: row.GRU_ID,
            groupName: row.GRU_NOME,
            groupDescription: row.GRU_DESCRICAO,
            groupStatus: row.GRU_STATUS,
            userGroupStatus: row.UG_STATUS,
            userGroupDate: row.UG_DATA,
        };
    }
}

module.exports = new UserGroupRepository();