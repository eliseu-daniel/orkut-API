const SendMessage = require('../../../app/messages/sendMessage');
const GetMessage = require('../../../app/messages/getMessage');
const GetAllMessage = require('../../../app/messages/getAllMessages.js');
const MessageRepository = require('../../../infra/repositories/MessageRepository');

const sendMessageUseCase = new SendMessage(MessageRepository);
const getMessageUseCase = new GetMessage(MessageRepository);
const getAllMessagesUseCase = new GetAllMessage(MessageRepository);

const sendMessage = (realtime) => async (req, res) => {
    try {
        const result = await sendMessageUseCase.execute(req.body);

        if (req.body.contatoId) {
            realtime.sendToUser(req.body.contatoId, {
                type: 'new_message',
                from: req.body.usuId,
                to: req.body.contatoId,
                descricao: req.body.descricao,
                data: new Date().toISOString(),
            });
        }

        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        return res.status(400).json({ error: error.message });
    }
};

const getMessage = async (req, res) => {
    try {
        const { usuId, contatoId } = req.params;
        const messages = await getMessageUseCase.execute(usuId, contatoId);
        return res.status(200).json(messages);
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        return res.status(400).json({ error: error.message });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const messages = await getAllMessagesUseCase.getAllMessages();
        return res.status(200).json(messages);
    } catch (error) {
        console.error('Erro ao buscar todas as mensagens:', error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { sendMessage, getMessage, getAllMessages };
