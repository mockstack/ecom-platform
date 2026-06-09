import { Component, OnInit, Input, TemplateRef, ViewContainerRef, Directive } from '@angular/core';

@Component({
	standalone: false,
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

}

@Directive({
	standalone: false, selector: '[appBiRepeat]' })
export class RepeatDirective {
    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    @Input('appBiRepeat') set count(c: number) {
        this.viewContainer.clear();
        for (let i = 0; i < c; i++) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
