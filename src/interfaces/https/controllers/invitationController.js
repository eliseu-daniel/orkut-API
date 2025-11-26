const SendInvitation = require('../../../app/invitations/sendInvitation');
const InvitationRepository = require('../../../infra/repositories/InvitationRepository');
const GetInvitations = require('../../../app/invitations/getInvitation');
const GetIdInvivtation = require('../../../app/invitations/getIdInvitation');

const sendInvitation = new SendInvitation(InvitationRepository);
const getInvitations = new GetInvitations(InvitationRepository);
const getIdInvitation = new GetIdInvivtation(InvitationRepository);

const sendInvitationHandler = async (req, res) => {
    try {
        const result = await sendInvitation.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getInvitationsHandler = async (req, res) => {
    try {
        const invitations = await getInvitations.getAllInvitations();
        res.status(200).json(invitations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdInvitationHandler = async (req, res) => {
    try {
        const invitation = await getIdInvitation.execute(req.params.id);
        res.status(200).json(invitation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { sendInvitation: sendInvitationHandler, getInvitations: getInvitationsHandler, getIdInvitation: getIdInvitationHandler };