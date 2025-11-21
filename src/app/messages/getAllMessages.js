class GetAllMessages {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async getAllMessages() {
        const messages = await this.messageRepository.findAll();
        return messages;
    }
}
module.exports = GetAllMessages;