const CreatePublication = require('../../../app/publications/createPublication');
const PublicationRepository = require('../../../infrastructure/repositories/PublicationRepository');

const createPublication = new CreatePublication(PublicationRepository);

const createPublicationHandler = async (req, res) => {
    try {
        const result = await createPublication.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPublication: createPublicationHandler };