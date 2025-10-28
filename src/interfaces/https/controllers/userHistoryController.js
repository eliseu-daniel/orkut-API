const LogUserHistory = require('../../../app/userHistory/logUserHistory');
const UserHistoryRepository = require('../../../infrastructure/repositories/UserHistoryRepository');

const logUserHistory = new LogUserHistory(UserHistoryRepository);

const logUserHistoryHandler = async (req, res) => {
    try {
        const result = await logUserHistory.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { logUserHistory: logUserHistoryHandler };