class GetInvitations {
    constructor({ invitationRepository }) {
        this.invitationRepository = invitationRepository;
    }

    async getAll() {
        const invitations = await this.invitationRepository.getAll();
        return invitations;
    }
}

module.exports = GetInvitations;