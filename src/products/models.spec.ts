import connectionDB from '../database';
import productModel from './models';

describe('ProductModel:>', () => {
    beforeAll(() => {
        connectionDB.connect();
    });

    afterAll(() => {
        connectionDB.end();
    });

    describe('index route:>', () => {
        it('should have index method', () => {
            expect(productModel.index).toBeDefined();
        });

        it('should return a not empty list', async () => {
            const result = await productModel.index();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('show route:>', () => {
        it('should return the product with id equals to 2', async () => {
            const result = await productModel.show('2');
            expect(result[0].price).toBe(22);
            expect(result.length).toBe(1);
        });

        it('should throw an error', (done: DoneFn) => {
            productModel.show('JavaScript').catch((err) => {
                expect(err).toBeTruthy();
                done();
            });
        });
    });
});
