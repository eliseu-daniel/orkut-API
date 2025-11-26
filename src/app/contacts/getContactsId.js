class GetContactId {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(id) {
        const contact = await this.contactRepository.findById(id);
        return contact;
    }
}

module.exports = GetContactId;