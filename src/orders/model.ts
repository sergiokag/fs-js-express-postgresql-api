import connectionDB from '../database';

export interface Order {
    id?: number;
    product_id?: number;
    user_id?: number;
    status: 'active' | 'complete';
    quantity: number;
}

class OrderModel {
    async show(id: string): Promise<Order[]> {
        try {
            const sql =
                'SELECT * FROM orders_users_products WHERE "user_id" = $1 ORDER BY "product_id", "quantity"';
            const conn = await connectionDB.connect();
            const results = await connectionDB.query(sql, [id]);
            conn.release();
            return results.rows;
        } catch (err) {
            throw err;
        }
    }

    async create(
        quantity: number,
        status: 'active' | 'complete',
        userId: number,
        productId: number
    ): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders_users_products(quantity, status, user_id, product_id) VALUES ( $1, $2, $3, $4) RETURNING *';
            const conn = await connectionDB.connect();
            const results = await connectionDB.query(sql, [
                quantity,
                status,
                userId,
                productId,
            ]);
            conn.release();
            return results.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

const orderModel = new OrderModel();
export default orderModel;
