const AddUserToGroup = require('../../../app/userGroup/addUserToGroup');
const GetUserGroup = require('../../../app/userGroup/getUserGroup');
const UserGroupRepository = require('../../../infra/repositories/UserGroupRepository');

const addUserToGroup = new AddUserToGroup(UserGroupRepository);
const getUserGroup = new GetUserGroup(UserGroupRepository);

const addUserToGroupHandler = async (req, res) => {
    try {
        const result = await addUserToGroup.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserGroupHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const groupData = await getUserGroup.execute(userId);
        res.status(200).json(groupData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addUserToGroup: addUserToGroupHandler, getUserGroup: getUserGroupHandler };