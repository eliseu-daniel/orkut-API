class AddContact {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(data) {
        const { usu1Id, contatoId, tipo = 'AM' } = data;

        if (usu1Id === contatoId) throw new Error('Não pode adicionar a si mesmo');

        await this.contactRepository.create({ usu1Id, contatoId, tipo });
        return { message: 'Contato adicionado' };
    }
}

module.exports = AddContact;