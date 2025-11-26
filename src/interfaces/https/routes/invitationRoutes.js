const express = require('express');
const router = express.Router();
const { sendInvitation, getInvitations, getIdInvitation } = require('../controllers/invitationController');

router.post('/', sendInvitation);
router.get('/', getInvitations);
router.get('/:id', getIdInvitation);

module.exports = router;