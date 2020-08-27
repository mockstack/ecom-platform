import { Product } from './product';
import { IBuyItem } from './ibuy-item';

export class PackItem extends IBuyItem {
    constructor(product?: Product, quantity?: Number) {
        super({ product: product, quantity: quantity, id: undefined });
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
