import { Product } from './product';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deserializable } from './deserializable';

export class IBuyItem implements Deserializable {
    private _product: Product;
    private _quantity: Number;

    constructor(product?: Product, quantity?: Number) {
        this._product = product;
        this._quantity = quantity;
    }

    public set quantity(value: Number) {
        this._quantity = value;
    }

    public get quantity() {
        return this._quantity;
    }

    public set product(product: Product) {
        this._product = product;
    }

    public get product() {
        return this._product;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
