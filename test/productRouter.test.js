import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import { userService } from '../src/services/index.js';

const request = supertest(app);

describe('Product Routes', () => {
    let adminUser;
    let premiumUser;
    let regularUser;
    let cookie;
    let cookieRegular;
    let productId;

    before(async () => {

        adminUser = await userService.findByEmail('admin@prueba.cl');

        premiumUser = await userService.findByEmail('premium@prueba.cl');

        regularUser = await userService.findByEmail('regular@prueba.cl');

        const loginResponse = await request.post('/api/login').send({ email: adminUser.email, password: 'admin123' }).redirects(0);
        const loginResponsRegular = await request.post('/api/login').send({ email: regularUser.email, password: 'regular123' }).redirects(0);

        // * * mi sistema utiliza sesiones basadas en cookies (para el front) en conjunto con jwt por eso el 302 por que lo redirige a la vista correspondiente
        if (loginResponse.status === 302) {
            cookie = loginResponse.headers['set-cookie'][0];
        }

        if (loginResponsRegular.status === 302) {
            cookieRegular = loginResponsRegular.headers['set-cookie'][0];
        }


    });


    describe('Endpoints ', () => {

        it('POST /api/product => Should create a new product', async () => {

            const newProduct = {
                title: 'Test product',
                status: true,
                category: 'electronics',
                description: 'This is a test product',
                price: 100,
                thumbnail: 'https://example.com/product.jpg',
                code: 'TEST123',
                stock: 10,
            };

            const response = await request
                .post('/api/product')
                .set('Cookie', cookie)
                .send(newProduct)

            productId = response.body.data._id;
            expect(response.status).to.equals(200);
        });

        it('GET /api/product => Should get a list of products', async () => {
            const response = await request
                .get('/api/product')
                .expect(200);

            expect(response._body.data).to.have.property('products');
            expect(response._body.data.products).to.be.an('object');
        });

        it('GET /api/product/{id} => Should return a product by ID', async () => {
            const response = await request
                .get(`/api/product/${productId}`)
                .expect(200);

            expect(response.body.data).to.have.property('_id', productId);
            expect(response.body.data).to.have.property('title');
            expect(response.body.data).to.have.property('description');
        });

        it('PUT /api/product/{id} => Should update a product by id', async () => {
            const update = {
                stock: 150
            }
            const response = await request
                .put(`/api/product/${productId}`)
                .set('Cookie', cookie)
                .send(update)
                .expect(200);

            expect(response.status).to.equals(200);
            expect(response.body.data.stock).to.equals(150);
        });


        it('DELETE /api/product/{id} => Should delete a product by id', async () => {
            const response = await request
                .delete(`/api/product/${productId}`)
                .set('Cookie', cookie)
                .expect(200);

            expect(response.status).to.equals(200);
            expect(response.body.message).to.equals("Product deleted successfully");
        });

    });

    describe('Endpoints exceptions', () => {
        let idProductExistente = '65430c266f9f78cf35c3baf3'; // ** producto con owner admin
        let idNotFound = '65430c266f9f78cf35c3bad4';
        let castObjectIdFailed = '65430c266f9f78cf35c3baf#';


        it('POST /api/product => should fail to create a new product due to unauthorized access, returning a 401 Unauthorized.', async () => {

            const newProduct = {
                title: 'Test product',
                status: true,
                category: 'electronics',
                description: 'This is a test product',
                price: 100,
                thumbnail: 'https://example.com/product.jpg',
                code: 'TEST123',
                stock: 10,
            };

            const response = await request
                .post('/api/product')
                .set('Cookie', cookieRegular)
                .send(newProduct)
                .expect(401);

                expect(response.status).to.equals(401);
                expect(response.body.message).to.equals("No tiene permisos para realizar esta acción.");
            
        });


        it('GET /api/product/{idIncorrect} => Should fail to get product by Id returning 404 not found', async () => {
            const response = await request
                .get(`/api/product/${idNotFound}`)
                .expect(404);

            expect(response.status).to.equals(404);
            expect(response.body.message).to.equals("Product not found.");
        });

        it("GET /api/product/{castObjectIdFailed} => Should fail to cast an invalid ObjectId, returning a 400 bad request", async () => {
            const response = await request
                .get(`/api/product/${castObjectIdFailed}`)
                .expect(400);

            expect(response.status).to.equals(400);
            expect(response.body.message).to.equals("Invalid id");
        });



        // **  se trata de eliminar producto con un perfil no autorizado
        it("DELETE /api/product/{idProductExistente} => should fail to delete a product due to unauthorized access, returning a 401 Unauthorized. ", async () => {
            const response = await request
                .delete(`/api/product/${idProductExistente}`)
                .set('Cookie', cookieRegular)
                .expect(401);

            expect(response.status).to.equals(401);
            expect(response.body.message).to.equals("No tiene permisos para realizar esta acción.");
        });

        it('PUT /api/product/{idProductExistente} =>  should fail to update a product due to unauthorized access, returning a 401 Unauthorized.', async () => {
            const update = {
                stock: 150
            }
            const response = await request
                .put(`/api/product/${idProductExistente}`)
                .set('Cookie', cookieRegular)
                .send(update)
                .expect(401);

            expect(response.status).to.equals(401);
            expect(response.body.message).to.equals("No tiene permisos para realizar esta acción.");
        });
    });
})


