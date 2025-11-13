class SendMessage {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(data) {
        const { usuId, contatoId, descricao, status = 'E' } = data;

        if (!descricao) throw new Error('Mensagem não pode ser vazia');

        await this.messageRepository.create({ usuId, contatoId, descricao, status });
        return { usuId, contatoId, descricao };
    }
}

module.exports = SendMessage;