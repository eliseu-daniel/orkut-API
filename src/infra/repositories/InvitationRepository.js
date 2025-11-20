const pool = require('../database/pool');

class InvitationRepository {
    async create(invitation) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO CONVITES (CON_ID, USU_ID, CON_TEXTO, CON_TIPO, DEST_ID, CON_DATA)
        VALUES (:id, :usuId, :texto, :tipo, :destId, SYSTIMESTAMP)
      `;
            const binds = {
                id: invitation.id,
                usuId: invitation.usuId,
                texto: invitation.texto,
                tipo: invitation.tipo,
                destId: invitation.destId
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.row };
        } finally {
            if (connection) await connection.close();
        }
    }

    async getAll() {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT * FROM CONVITES`;
            const result = await connection.execute(sql);
            return result.rows.map(row => this.#mapRow(row));
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapRow(row) {
        return {
            id: row[0],
            usuId: row[1],
            texto: row[2],
            tipo: row[3],
            destId: row[4],
            data: row[5]
        };
    }
}

module.exports = new InvitationRepository();