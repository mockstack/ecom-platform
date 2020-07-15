import { Deserializable } from './deserializable';
import { AppUser } from './app-user';
import { City } from './city';
import { District } from './district';

export class AppUserProfile implements Deserializable {
    _id: String;
    first_name: String;
    last_name: String;
    email: String;
    user: AppUser;
    city: City;
    district: District;
    address: String;
    optional_address: String;
    created_date: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
