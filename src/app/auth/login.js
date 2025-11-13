const jwt = require('jsonwebtoken');

class Login {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(apelido) {
        const user = await this.userRepository.findByApelido(apelido);
        if (!user) throw new Error('Credenciais inválidas');

        const token = jwt.sign(
            { id: user.id, apelido: user.apelido },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return { token, user: { id: user.id, apelido: user.apelido } };
    }
}

module.exports = Login;