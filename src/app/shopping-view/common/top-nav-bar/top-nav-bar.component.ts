import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showLoginPopup() {
    console.log('show the login form');
  }

  showUserRegistrationForm() {
    console.log('show user registration form');
  }
}
