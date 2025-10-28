const SendInvitation = require('../../../app/invitations/sendInvitation');
const InvitationRepository = require('../../../infrastructure/repositories/InvitationRepository');

const sendInvitation = new SendInvitation(InvitationRepository);

const sendInvitationHandler = async (req, res) => {
    try {
        const result = await sendInvitation.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { sendInvitation: sendInvitationHandler };