import connectionDB from '../database';

class ProductModel {
    async index() {
        try {
            await connectionDB.connect();
            const results = await connectionDB.query('SELECT * FROM products');
            connectionDB.end();
            return results.rows;
        } catch (err) {
            throw err;
        }
    }
}

const productModel = new ProductModel();
export default productModel;
