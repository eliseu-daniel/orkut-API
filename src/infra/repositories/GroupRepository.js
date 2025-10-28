const pool = require('../database/pool');

class GroupRepository {
    async create(group) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO GRUPOS (GRU_ID, GRU_NOME, GRU_DESCRICAO, GRU_STATUS)
        VALUES (:id, :nome, :descricao, :status)
      `;
            const binds = { id: group.id, nome: group.nome, descricao: group.descricao, status: group.status };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }

    async findById(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT * FROM GRUPOS WHERE GRU_ID = :id`;
            const result = await connection.execute(sql, [id]);
            return result.rows.length > 0 ? this.#mapRow(result.rows[0]) : null;
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapRow(row) {
        return { id: row[0], nome: row[1], descricao: row[2], status: row[3] };
    }
}

module.exports = new GroupRepository();