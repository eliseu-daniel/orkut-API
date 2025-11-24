class SendMessage {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(data) {
        const { usuId, contatoId, descricao, status } = data;

        if (!descricao) throw new Error('Mensagem não pode ser vazia');

        const result = await this.messageRepository.create({ usuId, contatoId, descricao, status });
        return result;
    }
}

module.exports = SendMessage;