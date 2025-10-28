const oracledb = require('oracledb');
const pool = require('../database/pool');

class ActionRepository {
    async create(actionData) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO ACOES (AC_ID, AC_DESCRICAO, AC_IMAGEM)
        VALUES (:id, :descricao, :imagem)
      `;

            const binds = {
                id: actionData.id,
                descricao: actionData.descricao,
                imagem: actionData.imagem ? { val: actionData.imagem, type: oracledb.BLOB } : null
            };

            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rowsAffected };
        } catch (err) {
            throw new Error('Erro ao criar ação: ' + err.message);
        } finally {
            if (connection) await connection.close();
        }
    }

    async findById(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT AC_ID, AC_DESCRICAO, AC_IMAGEM FROM ACOES WHERE AC_ID = :id`;
            const result = await connection.execute(sql, [id]);

            if (result.rows.length === 0) return null;

            const row = result.rows[0];
            let imagemBuffer = null;

            if (row[2]) {
                const blob = row[2];
                imagemBuffer = await blob.getData();
            }

            return {
                id: row[0],
                descricao: row[1],
                imagem: imagemBuffer
            };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new ActionRepository();