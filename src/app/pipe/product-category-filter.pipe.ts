import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCategoryFilter'
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(products: any[], filter: any): any {
    if (!products || !filter) {
      return products;
    }

    return products.filter(item =>  item.category.name == filter.name);
  }

}
