import { Component, OnInit, Input, TemplateRef, ViewContainerRef, Directive } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

}

@Directive({ selector: '[biRepeat]' })
export class RepeatDirective {
    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    @Input('biRepeat') set count(c: number) {
        this.viewContainer.clear();
        for (let i = 0; i < c; i++) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
