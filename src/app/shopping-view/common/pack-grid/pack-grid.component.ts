import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pack-grid',
  templateUrl: './pack-grid.component.html',
  styleUrls: ['./pack-grid.component.scss']
})
export class PackGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showCheckout() {
    this.router.navigateByUrl("checkout");
  }

  showPackEdit() {
    this.router.navigateByUrl("pack/detail");
  }

}
