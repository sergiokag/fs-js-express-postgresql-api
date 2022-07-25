import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../server';
import productModel from './model';

const testToken = jwt.sign({ userId: 1 }, process.env.TOKEN_SECRET as string);

describe('productRouter', () => {
    describe('GET /products', () => {
        it('should return order of the user with id 1', async () => {
            spyOn(productModel, 'index').and.returnValue(
                Promise.resolve([
                    {
                        id: 1,
                        name: 'Test product name',
                        price: 100,
                        category: 'testing procut',
                    },
                ])
            );
            const response = await request(app).get('/products');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Test product name',
                    price: 100,
                    category: 'testing procut',
                },
            ]);
        });
    });

    describe('GET /products/:productId', () => {
        it('should return order of the user with id 1', async () => {
            spyOn(productModel, 'show').and.returnValue(
                Promise.resolve([
                    {
                        id: 1,
                        name: 'Test product name',
                        price: 100,
                        category: 'testing procut',
                    },
                ])
            );
            const response = await request(app).get('/products/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Test product name',
                    price: 100,
                    category: 'testing procut',
                },
            ]);
        });
    });

    describe('POST /create', () => {
        it('should add a new product', async () => {
            spyOn(productModel, 'create').and.returnValue(
                Promise.resolve({
                    id: 1,
                    name: 'Test product name',
                    price: 100,
                    category: 'testing procut',
                })
            );
            const response = await request(app)
                .post('/products/create')
                .send({
                    name: 'Test product name',
                    price: 100,
                    category: 'testing procut',
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + testToken);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'New product created successfully!',
            });
        });
    });
});
