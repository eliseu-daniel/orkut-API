const pool = require('../database/pool');

class UserRepository {
    async create(user) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO USUARIO (USU_ID, USU_NOME, USU_APELIDO, USU_DATANASC, USU_GENERO, USU_STATUS)
        VALUES (:id, :nome, :apelido, :dataNasc, :genero, :status)
      `;
            const binds = {
                id: user.id,
                nome: user.nome,
                apelido: user.apelido,
                dataNasc: user.dataNasc,
                genero: user.genero,
                status: user.status
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }

    async findById(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT * FROM USUARIO WHERE USU_ID = :id`;
            const result = await connection.execute(sql, [id]);
            return result.rows.length > 0 ? this.#mapRowToUser(result.rows[0]) : null;
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapRowToUser(row) {
        return {
            id: row[0],
            nome: row[1],
            apelido: row[2],
            dataNasc: row[3],
            genero: row[4],
            status: row[5]
        };
    }
}

module.exports = new UserRepository();