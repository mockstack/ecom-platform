import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  styleUrls: ['./product-grid-item.component.scss']
})
export class ProductGridItemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showProductInfo() {
    this.router.navigateByUrl('detail');
  }
}
