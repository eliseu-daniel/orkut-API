const express = require('express');
const { linkMessageToAction } = require('../controllers/actionMessageController');

module.exports = (realtime) => {
    const router = express.Router();

    router.post('/', async (req, res, next) => {
        try {
            const result = await linkMessageToAction(req, res);

            if (realtime && result?.message) {
                realtime.emit('newActionMessage', result.message);
            }

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });

    return router;
};
