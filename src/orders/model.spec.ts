import { User, userModel } from '../users';
import orderModel from './model';

describe('OrderModel:>', () => {
    beforeAll((done: DoneFn) => {
        const user: User = {
            firstName: 'Chester',
            lastName: 'Tester',
            userName: 'chetester',
            password: '11111',
        };
        userModel
            .create(user)
            .then(() => orderModel.create(1, 'active', 1, 1))
            .then(() => {
                done();
            });
    });

    describe('showCurrentOrder route:>', () => {
        it('should return a truthy value single order', async () => {
            const result = await orderModel.showCurrentOrder('1');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('create route:>', () => {
        it('should create an order with quantity 10', async () => {
            const result = await orderModel.create(10, 'active', 1, 2);
            expect(result).toBeTruthy();
            expect(result.quantity).toBe(10);
        });

        it('should throw when quantity 0', (done: DoneFn) => {
            orderModel.create(0, 'active', 1, 2).catch((err) => {
                expect(err).toBeTruthy();
                done();
            });
        });
    });
});
