import { Deserializable } from './Deserializable';
import { MapItem } from './map-item';
import { City } from './city';
import { Province } from './province';

export class District extends MapItem implements Deserializable {
	province_id: Province;
	cities: City[];
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
