; const express = require('express');
const router = express.Router();
const { createGroup, getGroup, getAllGroups } = require('../controllers/groupController');

router.post('/', createGroup);
router.get('/:id', getGroup);
router.get('/', getAllGroups);

module.exports = router;