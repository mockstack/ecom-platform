import { Deserializable } from './deserializable';
import { MapItem } from './map-item';
import { District } from './district';

export class Province extends MapItem implements Deserializable {

	districts: District[];
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
