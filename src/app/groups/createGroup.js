class CreateGroup {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute(data) {
        const { nome, descricao, status = 'ATIVO' } = data;

        if (!nome) throw new Error('Nome do grupo é obrigatório');

        const id = Date.now();
        await this.groupRepository.create({ id, nome, descricao, status });
        return { id, nome };
    }
}

module.exports = CreateGroup;