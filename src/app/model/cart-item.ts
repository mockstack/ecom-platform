export class CartItem {
    _id: String;
    productId: String;
    quantity: Number;

    constructor(id?: String, productId?: String, quantity?: Number) {
        this._id = id;
        this.productId = productId;
        this.quantity = quantity;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
