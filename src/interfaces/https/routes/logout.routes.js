const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const tokenBlacklist = require('../../../utils/tokenBlacklist');

router.post('/', auth, async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({ error: 'Token não fornecido' });
        }

        const decoded = req.user;
        const expiresIn = decoded.exp * 1000 - Date.now();

        await tokenBlacklist.add(token, expiresIn);

        return res.json({ message: 'Logout realizado com sucesso' });
    } catch (err) {
        console.error('Erro no logout:', err);
        return res.status(500).json({ error: 'Erro interno no logout' });
    }
});

module.exports = router;