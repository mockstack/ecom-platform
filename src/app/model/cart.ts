import { CartItem } from './cart-item';
import { IBuyItem } from './ibuy-item';

export class Cart {
    _id: String;
    userId: String;
    items: IBuyItem[];
    checkedOut: Boolean;
    created_date: Date;
    modified_date: Date;

    constructor(id?: String, userId?: String, items?: [IBuyItem], checkOut?: Boolean, createdDate?: Date,
        modifiedDate?: Date) {
        this._id = id;
        this.userId = userId;
        this.items = items;
        this.checkedOut = checkOut;
        this.created_date = createdDate;
        this.modified_date = modifiedDate;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
