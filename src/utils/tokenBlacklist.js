const NodeCache = require('node-cache');

const blacklist = new NodeCache({ stdTTL: 0, checkperiod: 120 });

const tokenBlacklist = {

    async add(token, expiresInMs) {

        blacklist.set(token, true, Math.floor(expiresInMs / 1000));
    },

    async has(token) {
        return blacklist.get(token) === true;
    },
};

module.exports = tokenBlacklist;