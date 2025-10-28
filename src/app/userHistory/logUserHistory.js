class LogUserHistory {
    constructor(userHistoryRepository) {
        this.userHistoryRepository = userHistoryRepository;
    }

    async execute(data) {
        const { usuId, mensagens = 0, comentarios = 0, publicacoes = 0 } = data;

        const id = Date.now();
        await this.userHistoryRepository.create({ id, usuId, mensagens, comentarios, publicacoes });
        return { id };
    }
}

module.exports = LogUserHistory;