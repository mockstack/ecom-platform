import { Product } from './product';
import { IBuyItem } from './ibuy-item';

export class CartItem extends IBuyItem {

    constructor(product?: Product, quantity?: Number) {
        super(product, quantity);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
