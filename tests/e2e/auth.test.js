const request = require('supertest');

describe('Auth E2E - Banco Real', () => {
    it('deve criar usuário e fazer login', async () => {

        const createRes = await request(global.app)
            .post('/api/users')
            .send({
                nome: 'Ana Teste',
                apelido: 'anareal123',
                dataNasc: '1990-01-01',
                genero: 'F'
            });

        expect(createRes.status).toBe(201);

        const userId = createRes.body.id;

        const loginRes = await request(global.app)
            .post('/api/auth/login')
            .send({
                apelido: 'anareal123',
            });

        expect(loginRes.status).toBe(200);
        expect(loginRes.body.token).toBeDefined();

        global.token = loginRes.body.token;
        global.userId = userId;
    });
}, 60000);