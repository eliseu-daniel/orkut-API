const CreateNotification = require('../../../app/notifications/createNotification');
const GetNotificationsByUser = require('../../../app/notifications/getNofitications');
const NotificationRepository = require('../../../infra/repositories/NotificationRepository');

const repo = new NotificationRepository();

const createNotification = new CreateNotification(repo);
const getNotification = new GetNotificationsByUser(repo);

const createNotificationHandler = (realtimne) => async (req, res) => {
    try {
        const result = await createNotification.execute(req.body);

        if (req.body.userId) {
            realtimne.sendToUser(req.body.userId, {
                type: 'new_notification',
                userId: req.body.userId,
                message: req.body.message,
                date: new Date().toISOString(),
            });
        }

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getNotificationsHandler = (realtime) => async (req, res) => {
    try {
        const userId = req.params.id;

        const notifications = await getNotification.execute(userId);

        realtime.sendToUser(userId, {
            type: 'notifications',
            data: notifications,
            receivedAt: new Date().toISOString()
        });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createNotification: createNotificationHandler, getNotificationByUserController: getNotificationsHandler };