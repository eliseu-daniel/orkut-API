class CreatePublication {
    constructor(publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    async execute(data) {
        const { usuId, texto, status = 'A' } = data;

        if (!texto) throw new Error('Texto da publicação é obrigatório');

        const id = Date.now();
        await this.publicationRepository.create({ id, usuId, texto, status });
        return { id, texto };
    }
}

module.exports = CreatePublication;