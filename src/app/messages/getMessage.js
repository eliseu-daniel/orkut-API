class GetMessage {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(usuId, contatoId) {
        if (!usuId || !contatoId) {
            throw new Error('Usuário e Contato são obrigatórios');
        }

        const messages = await this.messageRepository.findByUserAndContact(usuId, contatoId);
        return messages;
    }
}

module.exports = GetMessage;