const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = global.app;

describe('Action E2E', () => {
    it('deve criar ação com imagem (BLOB)', async () => {
        const imagePath = path.join(__dirname, '../fixtures/images.jpeg');
        const imageBuffer = fs.readFileSync(imagePath);

        const res = await request(app)
            .post('/api/actions')
            .set('Authorization', `Bearer ${global.token}`)
            .field('descricao', 'Ação E2E com imagem')
            .attach('imagem', imageBuffer, 'test.jpg');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });
});