const LinkPublicationToAction = require('../../../app/actionPublication/linkPublicationToAction');
const ActionPublicationRepository = require('../../../infra/repositories/ActionPublicationRepository');

const linkPublicationToAction = new LinkPublicationToAction(ActionPublicationRepository);

const linkPublicationToActionHandler = async (req, res) => {
    try {
        const result = await linkPublicationToAction.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { linkPublicationToAction: linkPublicationToActionHandler };