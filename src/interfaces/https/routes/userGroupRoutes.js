const express = require('express');
const router = express.Router();
const { addUserToGroup, getUserGroup } = require('../controllers/userGroupController');

router.post('/', addUserToGroup);
router.get('/:id', getUserGroup);

module.exports = router;