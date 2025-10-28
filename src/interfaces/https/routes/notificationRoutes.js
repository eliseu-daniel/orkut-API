const express = require('express');
const router = express.Router();
const { createNotification } = require('../controllers/notificationController');

router.post('/', createNotification);

module.exports = router;