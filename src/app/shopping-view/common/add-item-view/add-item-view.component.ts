import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-add-item-view',
    templateUrl: './add-item-view.component.html',
    styleUrls: ['./add-item-view.component.scss']
})
export class AddItemViewComponent implements OnInit {

    @Input() message: string;

    constructor() { }

    ngOnInit(): void {
    }

}
