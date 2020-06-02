import { Deserializable } from './deserializable';

export class AppSocialUser implements Deserializable{
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    authToken: string;
    provider: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
