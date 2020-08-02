import { Deserializable } from './deserializable';

export class MapItem implements Deserializable {
	_id: String;
	id: Number;
	name_en: String;
	name_si: String;
	name_ta: String;
	service_available: Boolean;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
