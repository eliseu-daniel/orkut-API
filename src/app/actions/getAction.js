class GetAction {
    constructor(actionRepository) {
        this.actionRepository = actionRepository;
    }

    async execute(id) {
        const action = await this.actionRepository.findById(id);
        if (!action) throw new Error('Ação não encontrada');
        return action;
    }
}

module.exports = GetAction;