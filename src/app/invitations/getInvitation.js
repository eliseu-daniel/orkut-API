class GetInvitations {
    constructor(invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    async getAllInvitations() {
        const invitations = await this.invitationRepository.findAllInvitations();
        return invitations;
    }
}

module.exports = GetInvitations;