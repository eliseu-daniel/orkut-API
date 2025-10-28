class SendInvitation {
    constructor(invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    async execute(data) {
        const { usuId, texto, tipo, destId } = data;

        const id = Date.now().toString().padStart(20, '0');
        await this.invitationRepository.create({ id, usuId, texto, tipo, destId });
        return { id };
    }
}

module.exports = SendInvitation;