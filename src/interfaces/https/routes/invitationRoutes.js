const express = require('express');
const router = express.Router();
const { sendInvitation, getInvitations } = require('../controllers/invitationController');

router.post('/', sendInvitation);
router.get('/', getInvitations);

module.exports = router;