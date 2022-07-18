import productModel, { Product } from './model';

describe('ProductModel:>', () => {
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

    describe('create route:>', () => {
        it('should add a new product', async () => {
            const product: Product = {
                name: 'Test product',
                price: 0,
            };

            await productModel.create(product);
            const result = await productModel.index();
            expect(result[result.length - 1].name).toContain('Test ');
            expect(result[result.length - 1].price).toBe(0);
            expect(result[result.length - 1].category).toBeNull();
        });
    });
});
