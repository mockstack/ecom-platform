import { Deserializable } from './deserializable';
import { AppUser } from './app-user';

export class UserSession implements Deserializable {
    _id: string;
    userId: AppUser;
    createdDate: Date;
    endDate: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
