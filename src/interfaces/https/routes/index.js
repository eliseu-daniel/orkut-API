const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/actions', require('./actionRoutes'));
router.use('/actions/messages', require('./actionMessageRoutes'));
router.use('/actions/publications', require('./actionPublicationRoutes'));
router.use('/comments', require('./commentRoutes'));
router.use('/contacts', require('./contactRoutes'));
router.use('/invitations', require('./invitationRoutes'));
router.use('/groups', require('./groupRoutes'));
router.use('/users/history', require('./userHistoryRoutes'));
router.use('/messages', require('./messageRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/publications', require('./publicationRoutes'));
router.use('/groups/members', require('./userGroupRoutes'));

module.exports = router;