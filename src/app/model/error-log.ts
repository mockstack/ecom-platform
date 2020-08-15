import { Deserializable } from './deserializable';

export class ErrorLog implements Deserializable {
    category: String;
    message: String;
    data: String;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
