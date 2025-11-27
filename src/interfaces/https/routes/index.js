const express = require('express');
const auth = require('../middlewares/auth');

module.exports = (realtime) => {
    const router = express.Router();

    router.use('/auth', require('./auth.routes'));
    router.use('/register', require('./createLogin'));
    router.use('/logout', require('./logout.routes'));

    router.use('/users', auth, require('./userRoutes'));
    router.use('/actions', auth, require('./actionRoutes'));
    router.use('/actions/messages', auth, require('./actionMessageRoutes')(realtime));
    router.use('/actions/publications', auth, require('./actionPublicationRoutes'));
    router.use('/comments', auth, require('./commentRoutes'));
    router.use('/contacts', auth, require('./contactRoutes'));
    router.use('/invitations', auth, require('./invitationRoutes'));
    router.use('/groups', auth, require('./groupRoutes'));
    router.use('/users/history', auth, require('./userHistoryRoutes'));
    router.use('/messages', auth, require('./messageRoutes')(realtime));

    router.use('/notifications', auth, require('./notificationRoutes')(realtime));

    router.use('/publications', auth, require('./publicationRoutes'));
    router.use('/groups/members', auth, require('./userGroupRoutes'));

    return router;
};
