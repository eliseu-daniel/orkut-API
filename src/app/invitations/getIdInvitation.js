class GetIdIntervation {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(id) {
        if (!id) {
            throw new Error('ID is required');
        }
        const invitation = await this.repository.findById(id);
        return invitation;
    }
}

module.exports = GetIdIntervation;