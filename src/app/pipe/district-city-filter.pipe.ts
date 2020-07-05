import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../model/city';
import { District } from '../model/district';

@Pipe({
	name: 'districtCityFilter'
})
/**
 * Returns cities which are in the selected district.
 */
export class DistrictCityFilterPipe implements PipeTransform {

	transform(availableCities: City[], selectedDistrict: District): any {
		if (!availableCities || !selectedDistrict) {
			return availableCities;
		}

		return availableCities.filter(item => item.district_id._id === selectedDistrict._id);
	}

}
