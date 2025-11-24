class GetMessageId {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async getMessageById(id) {
        const message = await this.messageRepository.findById(id);
        if (!message) {
            throw new Error('Mensagem não encontrada');
        }
        return message;
    }
}

module.exports = GetMessageId;