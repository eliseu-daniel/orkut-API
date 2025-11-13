class AddContact {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(data) {
        const { usuId, contatoId, tipo = 'AM' } = data;

        if (usuId === contatoId) throw new Error('Não pode adicionar a si mesmo');

        await this.contactRepository.create({ usuId, contatoId, tipo });
        return { message: 'Contato adicionado' };
    }
}

module.exports = AddContact;