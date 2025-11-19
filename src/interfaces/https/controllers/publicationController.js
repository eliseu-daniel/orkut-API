const CreatePublication = require('../../../app/publications/createPublication');
const PublicationRepository = require('../../../infra/repositories/PublicationRepository');
const GetPublications = require('../../../app/publications/getPublications');
const GetPublicationById = require('../../../app/publications/getPublicationId');

const createPublication = new CreatePublication(PublicationRepository);
const getPublications = new GetPublications(PublicationRepository);
const getPublicationById = new GetPublicationById(PublicationRepository);

const createPublicationHandler = async (req, res) => {
    try {
        const result = await createPublication.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPublicationsHandler = async (req, res) => {
    try {
        const publications = await getPublications.execute();
        res.status(200).json(publications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPublicationsByUserHandler = async (req, res) => {
    try {
        const usuId = req.params.usuId;
        const publications = await getPublicationById.execute({ usuId });
        res.status(200).json(publications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPublication: createPublicationHandler, getPublications: getPublicationsHandler, getPublicationsByUser: getPublicationsByUserHandler };