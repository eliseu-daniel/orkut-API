const express = require('express');
const router = express.Router();
const { logUserHistory } = require('../controllers/userHistoryController');

router.post('/', logUserHistory);

module.exports = router;