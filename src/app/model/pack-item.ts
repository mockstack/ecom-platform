import { Product } from './product';
import { IBuyItem } from './ibuy-item';

export class PackItem implements IBuyItem {
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
