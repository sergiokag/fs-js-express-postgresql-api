import jwt from 'jsonwebtoken';
import request from 'supertest';
import productModel from '../products/model';

import app from '../server';
import { userModel } from '../users';
import orderModel from './model';

const testToken = jwt.sign({ userId: 1 }, process.env.TOKEN_SECRET as string);

describe('orderRouter', () => {
    describe('GET /user/:userId', () => {
        it('should return order of the user with id 1', async () => {
            spyOn(orderModel, 'showCurrentOrder').and.returnValue(
                Promise.resolve([
                    {
                        id: 1,
                        product_id: 1,
                        user_id: 1,
                        order_id: 1,
                        status: 'active',
                        quantity: 2,
                    },
                ])
            );
            const response = await request(app)
                .get('/orders/user/1')
                .set('Authorization', 'Bearer ' + testToken);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    id: 1,
                    product_id: 1,
                    user_id: 1,
                    order_id: 1,
                    status: 'active',
                    quantity: 2,
                },
            ]);
        });
    });

    describe('POST /add-product', () => {
        it('should add a new order', async () => {
            spyOn(orderModel, 'create').and.returnValue(
                Promise.resolve({
                    id: 1,
                    product_id: 1,
                    user_id: 1,
                    order_id: 1,
                    status: 'active',
                    quantity: 2,
                })
            );

            spyOn(userModel, 'show').and.returnValue(
                Promise.resolve([
                    {
                        id: 1,
                        firstName: 'Jane',
                        lastName: 'Doe',
                        userName: 'janeDoe',
                        password: '12345',
                    },
                ])
            );

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

            const response = await request(app)
                .post('/orders/add-product')
                .send({
                    userId: 1,
                    productId: 1,
                    quantity: 2,
                    status: 'active',
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + testToken);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: 1,
                product_id: 1,
                user_id: 1,
                order_id: 1,
                status: 'active',
                quantity: 2,
            });
        });
    });
});
