import productModel from './models';

describe('ProductModel', () => {
    it('should have index method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should return a list', async () => {
        const result = await productModel.index();
        expect(result.length).toBe(1);
    });
});
