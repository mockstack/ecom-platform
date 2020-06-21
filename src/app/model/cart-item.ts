import { ProductService } from '../ws/product.service';
import { Product } from './product';

export class CartItem {
    product: Product;
    quantity: Number;

    constructor(product?: Product, quantity?: Number) {
        this.product = product;
        this.quantity = quantity;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
