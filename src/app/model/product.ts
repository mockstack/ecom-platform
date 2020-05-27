import { Deserializable } from './deserializable';

export class Product implements Deserializable {
    _id: String;
    name: String;
    unit_price: Number;
    long_desc: String;
    short_desc: String;
    category: String;
    supplier: String;
    features: String;
    promotions: String;
    stockAvailable: Boolean;
    showToCustomer: Boolean;
    created_date: Date;
    modified_date: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
