export class PackItem {
    productId: string;
    productName: string;
    quantity: number;

    constructor(productId: string, productName: string, quantity: number) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
    }
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
