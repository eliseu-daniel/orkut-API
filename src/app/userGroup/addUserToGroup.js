class AddUserToGroup {
    constructor(userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    async execute(data) {
        const { usuId, gruId, status = 'AT' } = data;

        await this.userGroupRepository.create({ usuId, gruId, status });
        return { message: 'Usuário adicionado ao grupo' };
    }
}

module.exports = AddUserToGroup;