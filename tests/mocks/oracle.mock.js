const oracledb = require('oracledb');
const mockPool = {
    getConnection: jest.fn().mockResolvedValue({
        execute: jest.fn().mockResolvedValue({ rowsAffected: 1 }),
        close: jest.fn()
    })
};

jest.mock('oracledb', () => ({
    getPool: jest.fn(() => mockPool),
    createPool: jest.fn(),
    BLOB: 'BLOB'
}));

module.exports = mockPool;