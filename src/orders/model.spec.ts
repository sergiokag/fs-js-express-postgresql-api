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

    describe('show route:>', () => {
        it('should return a single order with for user with id equals to 1', async () => {
            const result = await orderModel.show('1');
            expect(result.length).toBe(1);
        });
    });
});
