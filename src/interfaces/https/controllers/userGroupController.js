const AddUserToGroup = require('../../../app/userGroup/addUserToGroup');
const UserGroupRepository = require('../../../infra/repositories/UserGroupRepository');

const addUserToGroup = new AddUserToGroup(UserGroupRepository);

const addUserToGroupHandler = async (req, res) => {
    try {
        const result = await addUserToGroup.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addUserToGroup: addUserToGroupHandler };