import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-grid-item',
  templateUrl: './home-grid-item.component.html',
  styleUrls: ['./home-grid-item.component.scss']
})
export class HomeGridItemComponent implements OnInit {

  @Input() product: Product;
  serverUrl = environment.apiUrl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
