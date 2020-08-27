import { Product } from './product';
import { IBuyItem } from './ibuy-item';
import { BehaviorSubject, Observable } from 'rxjs';

export class CartItem extends IBuyItem {

    private notifier = new BehaviorSubject(super.quantity);
    private qcObserver = this.notifier.asObservable();

    constructor(product?: Product, quantity?: Number) {
        super({ product: product, quantity: quantity, id: undefined });
    }

    public get quantity() {
        return super.quantity;
    }

    public set quantity(quantity: Number) {
        super.quantity = quantity;
        this.notifier.next(quantity);
    }

    public subscribe(): Observable<Number> {
        return this.qcObserver;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
