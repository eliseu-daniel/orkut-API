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
            return { inserted: result.rowsAffected };
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new ContactRepository();