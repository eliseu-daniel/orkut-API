const express = require('express');
const router = express.Router();
const { sendInvitation } = require('../controllers/invitationController');

router.post('/', sendInvitation);

module.exports = router;