import connectionDB from '../database';

export interface Order {
    id?: number;
    product_id?: number;
    user_id?: number;
    order_id?: number;
    status: 'active' | 'complete';
    quantity: number;
}

class OrderModel {
    async showCurrentOrder(id: string): Promise<Order[]> {
        try {
            const sql = `
                 SELECT 
                    * 
                 FROM orders 
                 INNER JOIN orders_products 
                    ON orders.id = orders_products.order_id
                 WHERE orders.user_id = $1 AND orders.status = 'active'
                 ORDER BY orders_products.product_id, orders_products.quantity`;
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
            const conn = await connectionDB.connect();

            const orderSql =
                'INSERT INTO orders(status, user_id) VALUES ( $1, $2 ) RETURNING *';
            const orderResults = await connectionDB.query(orderSql, [
                status,
                userId,
            ]);

            const prdersProductsSql =
                'INSERT INTO orders_products(quantity, order_id, product_id) VALUES ( $1, $2, $3 ) RETURNING *';
            const ordersProductsResults = await connectionDB.query(
                prdersProductsSql,
                [quantity, orderResults.rows[0].id, productId]
            );

            conn.release();
            return {
                user_id: orderResults.rows[0].user_id,
                product_id: ordersProductsResults.rows[0].product_id,
                order_id: ordersProductsResults.rows[0].order_id,
                quantity: ordersProductsResults.rows[0].quantity,
                status: orderResults.rows[0].status,
            };
        } catch (err) {
            throw err;
        }
    }
}

const orderModel = new OrderModel();
export default orderModel;
