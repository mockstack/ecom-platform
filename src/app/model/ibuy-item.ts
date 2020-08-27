import { Product } from './product';
import { Deserializable } from './deserializable';

interface IBuy {
    product: Product;
    quantity: Number;
    id: String;
}

export class IBuyItem implements Deserializable {
    private buyItem: IBuy;

    constructor(buyItem: IBuy) {
        this.buyItem = buyItem;
    }

    public set quantity(value: Number) {
        this.buyItem.quantity = value;
    }

    public get quantity() {
        return this.buyItem.quantity;
    }

    public set product(product: Product) {
        this.buyItem.product = product;
    }

    public get product() {
        return this.buyItem.product;
    }

    public set _id(id: String) {
        this.buyItem.id = id;
    }

    public get _id() {
        return this.buyItem.id;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
