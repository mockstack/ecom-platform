import { PackItem } from './pack-item';

export class Pack {
    _id: String;
    name: string;
    description: string;
    owner: string;
    active: boolean;
    packItems: PackItem[];

    constructor(name: string, description: string, owner: string, active: boolean, packItems: PackItem[], packId?:String) {
        this._id = packId;
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.active = active;
        this.packItems = packItems;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
