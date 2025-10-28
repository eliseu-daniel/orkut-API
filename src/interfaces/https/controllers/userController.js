const CreateUser = require('../../../app/users/createUser');
const GetUser = require('../../../app/users/getUser');
const UserRepository = require('../../../infrastructure/repositories/UserRepository');

const createUser = new CreateUser(UserRepository);
const getUser = new GetUser(UserRepository);

const createUserHandler = async (req, res) => {
    try {
        const result = await createUser.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserHandler = async (req, res) => {
    try {
        const result = await getUser.execute(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { createUser: createUserHandler, getUser: getUserHandler };