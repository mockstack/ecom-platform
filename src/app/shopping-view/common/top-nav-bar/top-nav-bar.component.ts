import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/ws/product.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  selectedProduct:String;
  selectedOption: String;
  productList = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductNames().subscribe((data: any[]) => {
      this.productList = data;
    });
  }

  onSelectProduct(event: TypeaheadMatch): void {
    this.selectedOption = event.item._id;
    console.log(this.selectedOption)
  }

  showCart() {
    this.router.navigateByUrl('cart');
  }

  showLogin() {
    this.router.navigateByUrl('login');
  }

  showRegister() {
    this.router.navigateByUrl('register');
  }

  showHome() {
    this.router.navigateByUrl('')
  }
}
