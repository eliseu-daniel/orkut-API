const pool = require('../database/pool');

class ContactRepository {
    async create(contact) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO CONTATOS (USU1_ID, CONTATO_ID, CON_TIPO)
        VALUES (:usu1Id, :contatoId, :tipo)
      `;
            const binds = { usu1Id: contact.usuId, contatoId: contact.contatoId, tipo: contact.tipo };
            const result = await connection.execute(sql, binds, { autoCommit: true });
            return { inserted: result.rows };
        } finally {
            if (connection) await connection.close();
        }
    }

    async findById(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `
            SELECT C.USU1_ID, C.CONTATO_ID, C.CON_TIPO, U.USU_NOME
            FROM CONTATOS C
            JOIN USUARIO U ON C.CONTATO_ID = U.USU_ID
            WHERE C.USU1_ID = :id 
      `;
            const binds = { id };
            const result = await connection.execute(sql, binds);
            return result.rows.map(row => this.#mapToModel(row));
        } finally {
            if (connection) await connection.close();
        }
    }

    #mapToModel(row) {
        return {
            usu1Id: row[0],
            contatoId: row[1],
            tipo: row[2],
            nomeContato: row[3],
        };
    }
}

module.exports = new ContactRepository();