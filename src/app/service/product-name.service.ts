import { Injectable } from '@angular/core';
import { ProductService } from '../ws/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductNameService {

  private _productList;
  private _categoryList;

  constructor(private productService: ProductService) { 
  }

  public get productList() {
    return this._productList;
  }

  public set productList(list: any) {
    this._productList = list;
  }

  public get categoryList() {
    return this._categoryList;
  }

  public set categoryList(list: any) {
    this._categoryList = list;
  }


}
