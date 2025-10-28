const express = require('express');
const router = express.Router();
const { addUserToGroup } = require('../controllers/userGroupController');

router.post('/', addUserToGroup);

module.exports = router;