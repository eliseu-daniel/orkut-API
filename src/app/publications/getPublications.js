class GetPublications {
    constructor(publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    async execute() {
        const publications = await this.publicationRepository.getAllPublications();
        return publications;
    }
}

module.exports = GetPublications;