const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/commentController');

router.post('/', createComment);
router.get('/', getComments);

module.exports = router;