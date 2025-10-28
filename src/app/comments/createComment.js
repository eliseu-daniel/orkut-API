class CreateComment {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(data) {
        const { pubId, usuId, texto } = data;

        if (!texto) throw new Error('Comentário não pode ser vazio');

        const cpId = Date.now();
        await this.commentRepository.create({ pubId, usuId, texto, cpId });
        return { cpId, texto };
    }
}

module.exports = CreateComment;