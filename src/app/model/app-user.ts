import { Deserializable } from './deserializable';

export class AppUser implements Deserializable {
    _id: string;
    id: String;
    name: String;
    email: String;
    password: String;
    photoUrl: String;
    firstName: String;
    lastName: String;
    authToken: String;
    provider: String;
    createdDate: Date;
    modifiedDate: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
