const request = require('supertest');
const WebSocket = require('ws');

describe('Message E2E', () => {
    let ws;

    beforeAll((done) => {
        setTimeout(() => {
            ws = new WebSocket('ws://localhost:3001?userId=DESTINO123');
            ws.on('open', () => done());
            ws.on('error', done);
        }, 1500);
    }, 10000);

    afterAll(() => ws?.close());

    it('envia e recebe mensagem', (done) => {
        ws.on('message', (data) => {
            const msg = JSON.parse(data);
            if (msg.type === 'nova_mensagem') {
                expect(msg.data.texto).toBe('Oi do E2E!');
                done();
            }
        });

        request(global.app)
            .post('/api/messages')
            .set('Authorization', `Bearer ${global.token}`)
            .send({
                usuId: global.userId,
                contatoId: 'DESTINO123',
                descricao: 'Oi do E2E!',
                status: 'E'
            })
            .expect(201);
    }, 20000);
});