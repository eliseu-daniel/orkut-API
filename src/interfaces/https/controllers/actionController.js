const CreateAction = require('../../../app/actions/createAction');
const GetAction = require('../../../app/actions/getAction');
const ActionRepository = require('../../../infra/repositories/ActionRepository');
const upload = require('../../../../app/config/multer').single('imagem');

const createAction = new CreateAction(ActionRepository);
const getAction = new GetAction(ActionRepository);

const createActionHandler = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const imagem = req.file ? req.file.buffer : null;
            const result = await createAction.execute({ ...req.body, imagem });
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

const getActionHandler = async (req, res) => {
    try {
        const result = await getAction.execute(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { createAction: createActionHandler, getAction: getActionHandler };