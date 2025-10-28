const CreateNotification = require('../../../app/notifications/createNotification');
const NotificationRepository = require('../../../infrastructure/repositories/NotificationRepository');

const createNotification = new CreateNotification(NotificationRepository);

const createNotificationHandler = async (req, res) => {
    try {
        const result = await createNotification.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createNotification: createNotificationHandler };