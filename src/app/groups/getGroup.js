class GetGroup {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute(id) {
        const group = await this.groupRepository.findById(id);
        if (!group) throw new Error('Grupo não encontrado');
        return group;
    }
}

module.exports = GetGroup;