const AddContact = require('../../../app/contacts/addContact');
const ContactRepository = require('../../../infra/repositories/ContactRepository');

const addContact = new AddContact(ContactRepository);

const addContactHandler = async (req, res) => {
    try {
        const result = await addContact.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addContact: addContactHandler };