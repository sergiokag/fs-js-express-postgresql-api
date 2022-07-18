import userModel, { User } from './model';

describe('UserModel:>', () => {
    beforeAll((done: DoneFn) => {
        const user: User = {
            firstName: 'Chester',
            lastName: 'Tester',
            userName: 'chetester',
            password: '11111',
        };
        userModel.create(user).then(() => {
            done();
        });
    });

    describe('index route:>', () => {
        it('should have index method', () => {
            expect(userModel.index).toBeDefined();
        });

        it('should return a list with one created users', async () => {
            const result = await userModel.index();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('show route:>', () => {
        it('should return the user with id equals to 1', async () => {
            const result = await userModel.show('1');
            expect(result.length).toBe(1);
        });
    });
});
