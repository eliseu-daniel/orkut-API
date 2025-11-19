class GetPublicationById {
    constructor(publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    async execute(usuId) {
        if (!usuId) {
            throw new Error('Id do usuário é obrigatório');
        }
        const publications = await this.publicationRepository.findByUserId(usuId);
        return publications;
    }
}

module.exports = GetPublicationById;