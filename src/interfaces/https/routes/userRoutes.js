const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const { getAllUser } = require('../controllers/userController');

router.get('/:id', getUser);
router.get('/', getAllUser);

module.exports = router;