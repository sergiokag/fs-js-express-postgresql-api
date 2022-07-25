import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../server';
import userModel from './model';

const testToken = jwt.sign({ userId: 1 }, process.env.TOKEN_SECRET as string);

describe('userRouter', () => {
    describe('GET /users', () => {
        it('should return all users', async () => {
            spyOn(userModel, 'index').and.returnValue(
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
            const response = await request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + testToken);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    id: 1,
                    firstName: 'Jane',
                    lastName: 'Doe',
                    userName: 'janeDoe',
                    password: '12345',
                },
            ]);
        });
    });

    describe('GET /users/:userId', () => {
        it('should return throw an 401 if token is not included', async () => {
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
            const response = await request(app).get('/users/1');

            expect(response.status).toBe(401);
        });
    });

    describe('POST /create', () => {
        it('should create a new user', async () => {
            spyOn(userModel, 'create').and.returnValue(
                Promise.resolve({
                    id: 1,
                    firstName: 'Jane',
                    lastName: 'Doe',
                    userName: 'janeDoe',
                    password: '12345',
                })
            );
            const response = await request(app)
                .post('/users/create')
                .send({
                    firstName: 'Jane',
                    lastName: 'Doe',
                    userName: 'janeDoe',
                    password: '12345',
                })
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
        });
    });
});
