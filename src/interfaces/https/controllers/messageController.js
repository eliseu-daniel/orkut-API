const SendMessage = require('../../../app/messages/sendMessage');
const MessageRepository = require('../../../infra/repositories/MessageRepository');
const GetMessage = require('../../../app/messages/getMessage');

const sendMessage = new SendMessage(MessageRepository);
const getMessage = new GetMessage(MessageRepository);

const sendMessageHandler = async (req, res) => {
    try {
        const result = await sendMessage.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMessageHandler = async (req, res) => {
    try {
        const { usuId, contatoId } = req.params;
        const messages = await getMessage.execute(usuId, contatoId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { sendMessage: sendMessageHandler, getMessage: getMessageHandler };