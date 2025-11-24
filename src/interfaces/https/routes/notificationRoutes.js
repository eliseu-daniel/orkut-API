const express = require('express');
const router = express.Router();
const { createNotification, getNotificationByUserController } = require('../controllers/notificationController');

module.exports = (realtime) => {
    // router.post('/', createNotification);
    router.get('/:id', getNotificationByUserController(realtime));

    return router;
}