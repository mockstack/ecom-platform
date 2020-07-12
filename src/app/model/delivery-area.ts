import { City } from './city'
import { District } from './district';
import { Deserializable } from './deserializable';

export class DeliveryArea implements Deserializable {
    _id: String;
    city: City;
    district: District;
    active: Boolean;
    delivery_charge: Number

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
