class CreateComment {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(data) {
        const { pubId, usuId, texto } = data;

        if (!texto) throw new Error('Comentário não pode ser vazio');

        const result = await this.commentRepository.create({ pubId, usuId, texto });
        return { status: true, data: result };
    }
}

module.exports = CreateComment;