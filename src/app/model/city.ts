import { Deserializable } from './Deserializable';
import { MapItem } from './map-item';
import { District } from './district';

export class City extends MapItem implements Deserializable {
	district_id: District;
	sub_name_en: String;
	sub_name_si: String;
	sub_name_ta: String;
	postcode: String;
	latitude: Number;
	longitude: Number;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
