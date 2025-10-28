class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(data) {
        const { nome, apelido, dataNasc, genero, status = 'AT' } = data;

        if (!nome || !apelido) {
            throw new Error('Nome e apelido são obrigatórios');
        }

        const id = Date.now().toString().padStart(20, '0');

        await this.userRepository.create({
            id,
            nome,
            apelido,
            dataNasc: new Date(dataNasc),
            genero,
            status
        });

        return { id, nome, apelido };
    }
}

module.exports = CreateUser;