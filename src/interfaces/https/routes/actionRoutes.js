const express = require('express');
const router = express.Router();
const { createAction, getAction } = require('../controllers/actionController');

router.post('/', createAction);
router.get('/:id', getAction);

module.exports = router;