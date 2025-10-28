class LinkPublicationToAction {
    constructor(actionPublicationRepository) {
        this.actionPublicationRepository = actionPublicationRepository;
    }

    async execute(data) {
        const { usuId, acId, pubId } = data;
        const apId = Date.now();

        await this.actionPublicationRepository.create({ usuId, acId, pubId, apId });
        return { apId };
    }
}

module.exports = LinkPublicationToAction;