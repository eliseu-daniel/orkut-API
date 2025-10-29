const Login = require('../../../app/auth/login');
const UserRepository = require('../../../infrastructure/repositories/UserRepository');

const loginUseCase = new Login(UserRepository);

const login = async (req, res) => {
    try {
        const { apelido } = req.body;
        if (!apelido) throw new Error('Apelido obrigatório');

        const result = await loginUseCase.execute(apelido);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { login };