const request = require('supertest');
const WSClient = require('../utils/websocketClient');
const app = global.app;

describe('Notification E2E com WebSocket', () => {
    let wsClient;

    beforeAll(async () => {
        wsClient = new WSClient('USER_NOTIF_789');
        await wsClient.connect();
    });

    afterAll(() => wsClient.close());

    it('deve criar notificação e receber em tempo real', async () => {
        await request(app)
            .post('/api/notifications')
            .set('Authorization', `Bearer ${global.token}`)
            .send({
                usuId: 'USER_NOTIF_789',
                tipo: 'AMIZADE',
                mensId: 'msg_001'
            });

        await new Promise(r => setTimeout(r, 1000));

        const messages = wsClient.getMessages();
        const notif = messages.find(m => m.type === 'nova_notificacao');

        expect(notif).toBeTruthy();
        expect(notif.data.mensagem).toBe('Nova amizade');
    });
});