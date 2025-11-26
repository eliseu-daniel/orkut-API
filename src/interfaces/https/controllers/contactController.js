const AddContact = require('../../../app/contacts/addContact');
const GetContacts = require('../../../app/contacts/getContactsId');
const ContactRepository = require('../../../infra/repositories/ContactRepository');

const addContact = new AddContact(ContactRepository);
const getContacts = new GetContacts(ContactRepository);

const addContactHandler = async (req, res) => {
    try {
        const result = await addContact.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getContactsHandler(req, res) {
    try {
        const id = req.params.id;
        const contacts = await getContacts.execute(id);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { addContact: addContactHandler, getContacts: getContactsHandler };