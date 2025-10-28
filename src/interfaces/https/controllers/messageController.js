const SendMessage = require('../../../app/messages/sendMessage');
const MessageRepository = require('../../../infrastructure/repositories/MessageRepository');

const sendMessage = new SendMessage(MessageRepository);

const sendMessageHandler = async (req, res) => {
    try {
        const result = await sendMessage.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { sendMessage: sendMessageHandler };