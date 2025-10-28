const express = require('express');
const router = express.Router();
const { createGroup, getGroup } = require('../controllers/groupController');

router.post('/', createGroup);
router.get('/:id', getGroup);

module.exports = router;