class SendMessage {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(data) {
        const { usuId, contatoId, descricao, status = 'E' } = data;

        if (!descricao) throw new Error('Mensagem não pode ser vazia');

        const id = Date.now();
        await this.messageRepository.create({ id, usuId, contatoId, descricao, status });
        return { id, descricao };
    }
}

module.exports = SendMessage;