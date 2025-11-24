const pool = require('../database/pool');

class MessageRepository {
    async create(message) {
        const connection = await pool.getConnection();

        const oracledb = require('oracledb');
        try {
            const sql = `
        INSERT INTO MENSAGENS (USU_ID, CONTATO_ID, MENS_DESCRICAO, MENS_STATUS, MENS_DATA)
        VALUES (:usuId, :contatoId, :descricao, :status, SYSTIMESTAMP)
        RETURNING MENS_ID INTO :newId
      `;
            const binds = {
                usuId: message.usuId,
                contatoId: message.contatoId,
                descricao: message.descricao,
                status: message.status,
                newId: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
            };

            const result = await connection.execute(sql, binds, { autoCommit: true });

            return {
                id: result.outBinds.newId[0],
                usuId: message.usuId,
                contatoId: message.contatoId,
                descricao: message.descricao,
                status: message.status
            };
        } finally {
            if (connection) await connection.close();
        }
    }

    async findByUserAndContact(usuId, contatoId) {
        const connection = await pool.getConnection();
        try {
            const sql = `
            SELECT 
                M.MENS_ID AS id,
                M.USU_ID AS usuId,
                M.CONTATO_ID AS contatoId,
                M.MENS_DESCRICAO AS descricao,
                M.MENS_STATUS AS status,
                M.MENS_DATA AS data,
                U.USU_NOME AS nomeUsuario
            FROM MENSAGENS M
            INNER JOIN USUARIO U ON U.USU_ID = M.USU_ID
            WHERE (USU_ID = :usuId AND CONTATO_ID = :contatoId)
               OR (USU_ID = :contatoId AND CONTATO_ID = :usuId)
            ORDER BY MENS_DATA ASC
        `;
            const binds = { usuId, contatoId };
            const oracledb = require('oracledb');
            const result = await connection.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows;
        } finally {
            if (connection) await connection.close();
        }
    }


    async findAll() {
        const connection = await pool.getConnection();
        try {
            const sql = `
            SELECT 
                M.MENS_ID AS id,
                M.USU_ID AS usuId,
                M.CONTATO_ID AS contatoId,
                M.MENS_DESCRICAO AS descricao,
                M.MENS_STATUS AS status,
                M.MENS_DATA AS data,
                U.USU_NOME AS nomeUsuario
            FROM MENSAGENS M
            INNER JOIN USUARIO U 
                ON U.USU_ID = M.USU_ID
            ORDER BY M.USU_ID ASC, M.MENS_DATA ASC
        `;

            const oracledb = require('oracledb');
            const result = await connection.execute(
                sql,
                {},
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            const mensagens = result.rows;

            // AGRUPAR POR usuId (quem enviou)
            const agrupado = mensagens.reduce((acc, msg) => {
                if (!acc[msg.USUID]) {
                    acc[msg.USUID] = {
                        usuId: msg.USUID,
                        nomeUsuario: msg.NOMEUSUARIO,
                        mensagens: []
                    };
                }
                acc[msg.USUID].mensagens.push(msg);
                return acc;
            }, {});

            return Object.values(agrupado);

        } finally {
            if (connection) await connection.close();
        }
    }

    async findById(id) {
        const connection = await pool.getConnection();
        try {
            const sql = `
            SELECT 
                M.MENS_ID AS id,
                M.USU_ID AS usuId,
                M.CONTATO_ID AS contatoId,
                M.MENS_DESCRICAO AS descricao,
                M.MENS_STATUS AS status,
                M.MENS_DATA AS data,
                U.USU_NOME AS nomeUsuario
            FROM MENSAGENS M
            INNER JOIN USUARIO U 
                ON U.USU_ID = M.USU_ID
            WHERE M.CONTATO_ID = :id
        `;

            const binds = { id };
            const oracledb = require('oracledb');
            const result = await connection.execute(
                sql,
                binds,
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            return result.rows[0];
        } finally {
            if (connection) await connection.close();
        }
    }

}

module.exports = new MessageRepository();