const CreateGroup = require('../../../app/groups/createGroup');
const GetGroup = require('../../../app/groups/getGroup');
const GroupRepository = require('../../../infrastructure/repositories/GroupRepository');

const createGroup = new CreateGroup(GroupRepository);
const getGroup = new GetGroup(GroupRepository);

const createGroupHandler = async (req, res) => {
    try {
        const result = await createGroup.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getGroupHandler = async (req, res) => {
    try {
        const result = await getGroup.execute(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { createGroup: createGroupHandler, getGroup: getGroupHandler };