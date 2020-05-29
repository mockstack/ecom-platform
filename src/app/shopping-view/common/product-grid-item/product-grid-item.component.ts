import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  styleUrls: ['./product-grid-item.component.scss']
})
export class ProductGridItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showProductInfo() {
    this.router.navigateByUrl('detail');
  }
}