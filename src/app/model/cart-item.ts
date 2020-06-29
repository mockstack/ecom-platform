import { ProductService } from '../ws/product.service';
import { Product } from './product';
import { IBuyItem } from './ibuy-item';

export class CartItem implements IBuyItem {
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
