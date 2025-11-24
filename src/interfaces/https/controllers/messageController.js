const SendMessage = require('../../../app/messages/sendMessage');
const GetMessage = require('../../../app/messages/getMessage');
const GetAllMessage = require('../../../app/messages/getAllMessages.js');
const GetMessageId = require('../../../app/messages/getMessageID');
const MessageRepository = require('../../../infra/repositories/MessageRepository');

const CreateNotification = require('../../../app/notifications/createNotification');
const NotificationRepository = require('../../../infra/repositories/NotificationRepository');
const notifRepo = new NotificationRepository();
const createNotificationUseCase = new CreateNotification(notifRepo);

const sendMessageUseCase = new SendMessage(MessageRepository);
const getMessageUseCase = new GetMessage(MessageRepository);
const getAllMessagesUseCase = new GetAllMessage(MessageRepository);
const getMessageByIdUseCase = new GetMessageId(MessageRepository);

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
                id: result.id
            });
        }

        await notifRepo.create({
            id: Date.now(),
            usuId: req.body.contatoId,
            tipo: 'mensagemTe',
            mensId: result.id,
            data: new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false }),
            status: 'N'
        });

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

const getMessageID = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await getMessageByIdUseCase.getMessageById(id);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Erro ao buscar mensagem por ID:', error);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { sendMessage, getMessage, getAllMessages, getMessageID };
