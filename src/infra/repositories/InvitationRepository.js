const pool = require('../database/pool');

class InvitationRepository {
    async create(invitation) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO CONVITES (CON_ID, USU_ID, CON_TEXTO, CON_TIPO, CON_DATA, DEST_ID)
        VALUES (:id, :usuId, :texto, :tipo, SYSTIMESTAMP, :destId)
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

    async findAllInvitations() {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT * FROM CONVITES`;
            const result = await connection.execute(sql);
            return result.rows.map(row => this.#mapRow(row));
        } finally {
            if (connection) await connection.close();
        }
    }

    async findById(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `SELECT 
                    C.CON_ID,
                    C.USU_ID,
                    C.CON_TEXTO,
                    C.CON_TIPO,
                    C.DEST_ID,
                    C.CON_DATA,
                    U.USU_NOME AS REMETENTE_NOME
                FROM CONVITES C
                INNER JOIN USUARIO U ON C.USU_ID = U.USU_ID
                WHERE C.DEST_ID = :id`;
            const binds = { id };
            const result = await connection.execute(sql, binds);

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
            data: row[5],
            remetenteNome: row[6]
        };
    }
}

module.exports = new InvitationRepository();