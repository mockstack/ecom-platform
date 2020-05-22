import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/ws/category.service';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.scss']
})
export class ProductTypeListComponent implements OnInit {

  public categoryList;

  constructor(public router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getProductCategories().subscribe((data: Object[]) => {
      this.categoryList = data;
    });
  }

}
