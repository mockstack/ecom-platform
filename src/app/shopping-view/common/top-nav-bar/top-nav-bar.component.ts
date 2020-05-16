import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
