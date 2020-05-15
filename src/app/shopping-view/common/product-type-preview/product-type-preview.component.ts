import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-type-preview',
  templateUrl: './product-type-preview.component.html',
  styleUrls: ['./product-type-preview.component.scss']
})
export class ProductTypePreviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showAllProductsByType() {
    this.router.navigateByUrl('products');
  }
}
