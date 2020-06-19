import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-items-view',
  templateUrl: './new-items-view.component.html',
  styleUrls: ['./new-items-view.component.scss']
})
export class NewItemsViewComponent implements OnInit {

  constructor() { }

  newItemList: number[] = [23, 4, 3, 6];

  ngOnInit(): void {
  }

}
