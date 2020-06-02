import { Deserializable } from './deserializable';

export class AppUser implements Deserializable {
    _id: string;
    email: string;
    password: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
