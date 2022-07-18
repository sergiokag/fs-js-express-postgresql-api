import connectionDB from '../database';

export interface Product {
    id?: number;
    name: string;
    price: number;
    category?: number;
}

class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const results = await connectionDB.query('SELECT * FROM products');
            return results.rows;
        } catch (err) {
            throw err;
        }
    }

    async show(id: string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE "id" = $1';
            const results = await connectionDB.query(sql, [id]);
            return results.rows;
        } catch (err) {
            throw err;
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const results = await connectionDB.query(sql, [
                product.name,
                product.price,
                product.category || null,
            ]);
            return results.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

const productModel = new ProductModel();
export default productModel;
