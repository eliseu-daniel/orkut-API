const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');

module.exports = (realtime) => {
    const router = express.Router();

    router.post('/', sendMessage(realtime));

    router.get('/:usuId/:contatoId', getMessage);

    return router;
};
