class LinkMessageToAction {
    constructor(actionMessageRepository) {
        this.actionMessageRepository = actionMessageRepository;
    }

    async execute(data) {
        const { acId, mensId } = data;
        const amId = Date.now();

        await this.actionMessageRepository.create({ acId, mensId, amId });
        return { amId };
    }
}

module.exports = LinkMessageToAction;