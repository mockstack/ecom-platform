import { Component, OnInit, Input } from '@angular/core';
import { BcNavigation } from 'src/app/model/bc-navigation';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  //Input items to the navigation
  @Input() urls: BcNavigation[] = [];

  constructor() { }

  ngOnInit(): void {
    //this.urls[0] = new BcNavigation('Home', 'login');
    //this.urls[1] = new BcNavigation('Home-2', 'register');
    //this.urls[2] = new BcNavigation('Home-3', '');
  }

}
