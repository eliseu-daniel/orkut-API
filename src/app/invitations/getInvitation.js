class GetInvitations {
    constructor({ invitationRepository }) {
        this.invitationRepository = invitationRepository;
    }

    async execute() {
        const invitations = await this.invitationRepository.getAll();
        return invitations;
    }
}

module.exports = GetInvitations;