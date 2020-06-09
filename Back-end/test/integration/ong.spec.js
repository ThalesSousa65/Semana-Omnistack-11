const Request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe("ONG", () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })
    
    it('should be able to creat a new ONG', async () => {
        const response = await  Request(app).post('/ongs').send({
            name: "Deleee",
	        email: "Dale@hotmail.com",
	        whatsapp: "11999999999",
	        city: "São Paulo",
        	uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});