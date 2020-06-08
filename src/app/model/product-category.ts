export class ProductCategory {
    _id: string;
    name: string;
    description: string;
    active: boolean;

    constructor(name: string, description: string, active: boolean, _id?: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.active = active;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
