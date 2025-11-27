class GetAllGroup {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute() {
        const group = await this.groupRepository.getAll();
        if (!group) throw new Error('Grupo não encontrado');
        return group;
    }
}

module.exports = GetAllGroup;