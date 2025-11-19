const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../../../utils/tokenBlacklist');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

    const token = authHeader.split(' ')[1];

    if (await tokenBlacklist.has(token)) {
        return res.status(401).json({ error: 'Token inválido (logout realizado)' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};