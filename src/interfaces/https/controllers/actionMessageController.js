const LinkMessageToAction = require('../../../app/actionMessage/linkMessageToAction');
const ActionMessageRepository = require('../../../infra/repositories/ActionMessageRepository');

const linkMessageToAction = new LinkMessageToAction(ActionMessageRepository);

const linkMessageToActionHandler = async (req, res) => {
    try {
        const result = await linkMessageToAction.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { linkMessageToAction: linkMessageToActionHandler };