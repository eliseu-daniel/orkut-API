const pool = require('../database/pool');

class CommentRepository {
    constructor(realtime) {
        this.realtime = realtime;
    }

    async create(comment) {
        const connection = await pool.getConnection();
        try {
            const sql = `
        INSERT INTO COMENTARIOS_PUBLICACAO (PUB_ID, USU_ID, AP_TEXTO, CP_DATA)
        VALUES (:pubId, :usuId, :apTexto, SYSTIMESTAMP)`;
            const binds = {
                pubId: comment.pubId,
                usuId: comment.usuId,
                apTexto: comment.texto
            };
            const result = await connection.execute(sql, binds, { autoCommit: true });

            return { status: true, commentId: result.lastRowid };
        } finally {
            if (connection) await connection.close();
        }
    }

    async getCommentIdPub(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `
            SELECT 
                CP.PUB_ID      AS "pubId",
                CP.USU_ID      AS "usuId",
                CP.AP_TEXTO    AS "texto",
                CP.CP_DATA     AS "data",
                U.USU_APELIDO     AS "nomeUsuComment"
            FROM COMENTARIOS_PUBLICACAO CP
            JOIN USUARIO U ON CP.USU_ID = U.USU_ID
            WHERE CP.PUB_ID = :id
            ORDER BY CP.CP_DATA DESC
        `;

            const binds = { id };

            const oracledb = require('oracledb');
            const result = await connection.execute(sql, binds, {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });

            return result.rows.map(row => this.#mapRowToModel(row));

        } finally {
            if (connection) await connection.close();
        }
    }

    #mapRowToModel(row) {
        return {
            pubId: row.pubId,
            usuId: row.usuId,
            texto: row.texto,
            data: row.data,
            nomeUsuComment: row.nomeUsuComment
        };
    }
}

module.exports = new CommentRepository;