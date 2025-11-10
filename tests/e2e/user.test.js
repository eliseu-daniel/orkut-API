const request = require('supertest');
const app = global.app;

describe('User E2E', () => {
    it('deve criar usuário com JWT', async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${global.token}`)
            .send({
                nome: 'Teste E2E',
                apelido: 'teste_e2e',
                dataNasc: '1990-01-01',
                genero: 'M'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });
});