class CreateGroup {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute(data) {
        const { nome, descricao, status = 'ATIVO' } = data;

        if (!nome) throw new Error('Nome do grupo é obrigatório');

        await this.groupRepository.create({ id, nome, descricao, status });
        return { id, nome, descricao, status };
    }
}

module.exports = CreateGroup;