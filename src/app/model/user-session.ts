import { Deserializable } from './deserializable';

export class UserSession implements Deserializable {
    _id: string;
    userId: string;
    createdDate: Date;
    endDate: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
