import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  styleUrls: ['./product-grid-item.component.scss']
})
export class ProductGridItemComponent implements OnInit {

  @Input() product: Product;
  serverUrl = environment.apiUrl;

  constructor(private router: Router, private cart: CartDataService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cart.addItem(new CartItem( undefined, product._id, 1));
  }
}
