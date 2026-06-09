import {
  AnimationBuilder
} from "./chunk-FIMGXSHV.js";
import {
  animate,
  style
} from "./chunk-NB7K5WP7.js";
import {
  NgClass
} from "./chunk-4UZ7RKL3.js";
import "./chunk-6QR36C7I.js";
import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  effect,
  input,
  output,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-QO6N2U2N.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-JRFR6BLO.js";
import "./chunk-MARUHEWW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-EIB7IA3J.js";

// node_modules/ngx-bootstrap/collapse/fesm2022/ngx-bootstrap-collapse.mjs
var COLLAPSE_ANIMATION_TIMING = "400ms cubic-bezier(0.4,0.0,0.2,1)";
var expandAnimation = [style({
  height: 0,
  visibility: "hidden"
}), animate(COLLAPSE_ANIMATION_TIMING, style({
  height: "*",
  visibility: "visible"
}))];
var collapseAnimation = [style({
  height: "*",
  visibility: "visible"
}), animate(COLLAPSE_ANIMATION_TIMING, style({
  height: 0,
  visibility: "hidden"
}))];
var CollapseDirective = class _CollapseDirective {
  constructor(_el, _renderer, _builder) {
    this._el = _el;
    this._renderer = _renderer;
    this.collapsed = output();
    this.collapses = output();
    this.expanded = output();
    this.expands = output();
    this.isExpanded = true;
    this.collapseNewValue = true;
    this.isCollapsed = false;
    this.isCollapse = true;
    this.isCollapsing = false;
    this.display = input("block", ...ngDevMode ? [{
      debugName: "display"
    }] : []);
    this.isAnimated = input(false, ...ngDevMode ? [{
      debugName: "isAnimated"
    }] : []);
    this.collapse = input(false, ...ngDevMode ? [{
      debugName: "collapse"
    }] : []);
    this._display = "block";
    this._stylesLoaded = false;
    this._COLLAPSE_ACTION_NAME = "collapse";
    this._EXPAND_ACTION_NAME = "expand";
    this._factoryCollapseAnimation = _builder.build(collapseAnimation);
    this._factoryExpandAnimation = _builder.build(expandAnimation);
    effect(() => {
      const displayValue = this.display();
      this._display = displayValue;
      if (displayValue === "none") {
        this.hide();
        return;
      }
      this.isAnimated() ? this.toggle() : this.show();
    });
    effect(() => {
      const collapseValue = this.collapse();
      this.collapseNewValue = collapseValue;
      if (!this._player || this._isAnimationDone) {
        this.isExpanded = collapseValue;
        this.toggle();
      }
    });
  }
  ngAfterViewChecked() {
    this._stylesLoaded = true;
    if (!this._player || !this._isAnimationDone) {
      return;
    }
    this._player.reset();
    this._renderer.setStyle(this._el.nativeElement, "height", "*");
  }
  /** allows to manually toggle content visibility */
  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }
  /** allows to manually hide content */
  hide() {
    this.isCollapsing = true;
    this.isExpanded = false;
    this.isCollapsed = true;
    this.isCollapsing = false;
    this.collapses.emit(this);
    this._isAnimationDone = false;
    this.animationRun(this.isAnimated(), this._COLLAPSE_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated()) {
        this.show();
        return;
      }
      this.collapsed.emit(this);
      this._renderer.setStyle(this._el.nativeElement, "display", "none");
    });
  }
  /** allows to manually show collapsed content */
  show() {
    this._renderer.setStyle(this._el.nativeElement, "display", this._display);
    this.isCollapsing = true;
    this.isExpanded = true;
    this.isCollapsed = false;
    this.isCollapsing = false;
    this.expands.emit(this);
    this._isAnimationDone = false;
    this.animationRun(this.isAnimated(), this._EXPAND_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated()) {
        this.hide();
        return;
      }
      this.expanded.emit(this);
      this._renderer.removeStyle(this._el.nativeElement, "overflow");
    });
  }
  animationRun(isAnimated, action) {
    if (!isAnimated || !this._stylesLoaded) {
      return (callback) => callback();
    }
    this._renderer.setStyle(this._el.nativeElement, "overflow", "hidden");
    this._renderer.addClass(this._el.nativeElement, "collapse");
    const factoryAnimation = action === this._EXPAND_ACTION_NAME ? this._factoryExpandAnimation : this._factoryCollapseAnimation;
    if (this._player) {
      this._player.reset();
    }
    this._player = factoryAnimation.create(this._el.nativeElement);
    this._player.play();
    return (callback) => this._player?.onDone(callback);
  }
  static {
    this.ɵfac = function CollapseDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CollapseDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(AnimationBuilder));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CollapseDirective,
      selectors: [["", "collapse", ""]],
      hostVars: 9,
      hostBindings: function CollapseDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-hidden", ctx.isCollapsed);
          ɵɵclassProp("collapse", ctx.isCollapse)("in", ctx.isExpanded)("show", ctx.isExpanded)("collapsing", ctx.isCollapsing);
        }
      },
      inputs: {
        display: [1, "display"],
        isAnimated: [1, "isAnimated"],
        collapse: [1, "collapse"]
      },
      outputs: {
        collapsed: "collapsed",
        collapses: "collapses",
        expanded: "expanded",
        expands: "expands"
      },
      exportAs: ["bs-collapse"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseDirective, [{
    type: Directive,
    args: [{
      selector: "[collapse]",
      exportAs: "bs-collapse",
      host: {
        "[class.collapse]": "true"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: AnimationBuilder
  }], {
    collapsed: [{
      type: Output,
      args: ["collapsed"]
    }],
    collapses: [{
      type: Output,
      args: ["collapses"]
    }],
    expanded: [{
      type: Output,
      args: ["expanded"]
    }],
    expands: [{
      type: Output,
      args: ["expands"]
    }],
    isExpanded: [{
      type: HostBinding,
      args: ["class.in"]
    }, {
      type: HostBinding,
      args: ["class.show"]
    }],
    isCollapsed: [{
      type: HostBinding,
      args: ["attr.aria-hidden"]
    }],
    isCollapse: [{
      type: HostBinding,
      args: ["class.collapse"]
    }],
    isCollapsing: [{
      type: HostBinding,
      args: ["class.collapsing"]
    }],
    display: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "display",
        required: false
      }]
    }],
    isAnimated: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "isAnimated",
        required: false
      }]
    }],
    collapse: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "collapse",
        required: false
      }]
    }]
  });
})();
var CollapseModule = class _CollapseModule {
  static {
    this.ɵfac = function CollapseModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CollapseModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CollapseModule,
      imports: [CollapseDirective],
      exports: [CollapseDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseModule, [{
    type: NgModule,
    args: [{
      imports: [CollapseDirective],
      exports: [CollapseDirective]
    }]
  }], null, null);
})();

// node_modules/ngx-bootstrap/accordion/fesm2022/ngx-bootstrap-accordion.mjs
var _c0 = ["*"];
var _c1 = [[["", "accordion-heading", ""]], "*"];
var _c2 = ["[accordion-heading]", "*"];
var _c3 = (a0) => ({
  "text-muted": a0
});
function AccordionPanelComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c3, ctx_r0.isDisabled()));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.heading(), " ");
  }
}
var AccordionConfig = class _AccordionConfig {
  constructor() {
    this.closeOthers = false;
    this.isAnimated = false;
  }
  static {
    this.ɵfac = function AccordionConfig_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionConfig)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AccordionConfig,
      factory: _AccordionConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var AccordionComponent = class _AccordionComponent {
  constructor(_config) {
    this._config = _config;
    this.isAnimated = input(this._config.isAnimated, ...ngDevMode ? [{
      debugName: "isAnimated"
    }] : []);
    this.closeOthers = input(this._config.closeOthers, ...ngDevMode ? [{
      debugName: "closeOthers"
    }] : []);
    this.groups = [];
  }
  closeOtherPanels(openGroup) {
    if (!this.closeOthers()) {
      return;
    }
    this.groups.forEach((group) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }
  addGroup(group) {
    group.isAnimated = this.isAnimated();
    this.groups.push(group);
  }
  removeGroup(group) {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
  static {
    this.ɵfac = function AccordionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionComponent)(ɵɵdirectiveInject(AccordionConfig));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AccordionComponent,
      selectors: [["accordion"]],
      hostAttrs: ["role", "tablist", 1, "panel-group", 2, "display", "block"],
      hostVars: 1,
      hostBindings: function AccordionComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-multiselectable", ctx.closeOthers());
        }
      },
      inputs: {
        isAnimated: [1, "isAnimated"],
        closeOthers: [1, "closeOthers"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function AccordionComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionComponent, [{
    type: Component,
    args: [{
      selector: "accordion",
      template: `<ng-content></ng-content>`,
      host: {
        "[attr.aria-multiselectable]": "closeOthers()",
        role: "tablist",
        class: "panel-group",
        style: "display: block"
      },
      standalone: true
    }]
  }], () => [{
    type: AccordionConfig
  }], {
    isAnimated: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "isAnimated",
        required: false
      }]
    }],
    closeOthers: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "closeOthers",
        required: false
      }]
    }]
  });
})();
var AccordionPanelComponent = class _AccordionPanelComponent {
  // Questionable, maybe .panel-open should be on child div.panel element?
  /** Is accordion group open or closed. This property supports two-way binding */
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(value) {
    if (value !== this._isOpen) {
      if (value) {
        this.accordion.closeOtherPanels(this);
      }
      this._isOpen = value;
      Promise.resolve(null).then(() => {
        this.isOpenChange.emit(value);
      });
    }
  }
  constructor(accordion) {
    this.isAnimated = false;
    this.heading = input("", ...ngDevMode ? [{
      debugName: "heading"
    }] : []);
    this.panelClass = input("panel-default", ...ngDevMode ? [{
      debugName: "panelClass"
    }] : []);
    this.isDisabled = input(false, ...ngDevMode ? [{
      debugName: "isDisabled"
    }] : []);
    this.isOpenInput = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "isOpenInput"
    } : {}), {
      alias: "isOpen"
    }));
    this.isOpenChange = output();
    this._isOpen = false;
    this.accordion = accordion;
    effect(() => {
      const isOpenValue = this.isOpenInput();
      if (isOpenValue !== this._isOpen) {
        this.isOpen = isOpenValue;
      }
    });
  }
  ngOnInit() {
    this.accordion.addGroup(this);
  }
  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }
  toggleOpen() {
    if (!this.isDisabled()) {
      this.isOpen = !this.isOpen;
    }
  }
  static {
    this.ɵfac = function AccordionPanelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionPanelComponent)(ɵɵdirectiveInject(AccordionComponent));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AccordionPanelComponent,
      selectors: [["accordion-group"], ["accordion-panel"]],
      hostAttrs: [1, "panel", 2, "display", "block"],
      hostVars: 2,
      hostBindings: function AccordionPanelComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("panel-open", ctx.isOpen);
        }
      },
      inputs: {
        heading: [1, "heading"],
        panelClass: [1, "panelClass"],
        isDisabled: [1, "isDisabled"],
        isOpenInput: [1, "isOpen", "isOpenInput"]
      },
      outputs: {
        isOpenChange: "isOpenChange"
      },
      ngContentSelectors: _c2,
      decls: 9,
      vars: 6,
      consts: [[1, "panel", "card", 3, "ngClass"], ["role", "tab", 1, "panel-heading", "card-header", 3, "click", "ngClass"], [1, "panel-title"], ["role", "button", 1, "accordion-toggle"], ["type", "button", 1, "btn", "btn-link", 3, "ngClass"], ["role", "tabpanel", 1, "panel-collapse", "collapse", 3, "collapse", "isAnimated"], [1, "panel-body", "card-block", "card-body"]],
      template: function AccordionPanelComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c1);
          ɵɵelementStart(0, "div", 0)(1, "div", 1);
          ɵɵlistener("click", function AccordionPanelComponent_Template_div_click_1_listener() {
            return ctx.toggleOpen();
          });
          ɵɵelementStart(2, "div", 2)(3, "div", 3);
          ɵɵconditionalCreate(4, AccordionPanelComponent_Conditional_4_Template, 2, 4, "button", 4);
          ɵɵprojection(5);
          ɵɵelementEnd()()();
          ɵɵelementStart(6, "div", 5)(7, "div", 6);
          ɵɵprojection(8, 1);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵproperty("ngClass", ctx.panelClass());
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.isDisabled() ? "panel-disabled" : "panel-enabled");
          ɵɵadvance(2);
          ɵɵattribute("aria-expanded", ctx.isOpen);
          ɵɵadvance();
          ɵɵconditional(ctx.heading() ? 4 : -1);
          ɵɵadvance(2);
          ɵɵproperty("collapse", !ctx.isOpen)("isAnimated", ctx.isAnimated);
        }
      },
      dependencies: [NgClass, CollapseModule, CollapseDirective],
      styles: ["[_nghost-%COMP%]   .card-header.panel-enabled[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]   .card-header.panel-disabled[_ngcontent-%COMP%]   .btn.btn-link[_ngcontent-%COMP%]{cursor:default;text-decoration:none}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionPanelComponent, [{
    type: Component,
    args: [{
      selector: "accordion-group, accordion-panel",
      host: {
        class: "panel",
        style: "display: block"
      },
      standalone: true,
      imports: [NgClass, CollapseModule],
      template: `<div class="panel card" [ngClass]="panelClass()">
  <div
    class="panel-heading card-header"
    role="tab"
    (click)="toggleOpen()"
    [ngClass]="isDisabled() ? 'panel-disabled' : 'panel-enabled'"
    >
    <div class="panel-title">
      <div role="button" class="accordion-toggle" [attr.aria-expanded]="isOpen">
        @if (heading()) {
          <button class="btn btn-link" [ngClass]="{ 'text-muted': isDisabled() }" type="button">
            {{ heading() }}
          </button>
        }
        <ng-content select="[accordion-heading]"></ng-content>
      </div>
    </div>
  </div>
  <div class="panel-collapse collapse" role="tabpanel" [collapse]="!isOpen" [isAnimated]="isAnimated">
    <div class="panel-body card-block card-body">
      <ng-content></ng-content>
    </div>
  </div>
</div>
`,
      styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}\n"]
    }]
  }], () => [{
    type: AccordionComponent,
    decorators: [{
      type: Inject,
      args: [AccordionComponent]
    }]
  }], {
    heading: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "heading",
        required: false
      }]
    }],
    panelClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "panelClass",
        required: false
      }]
    }],
    isDisabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "isDisabled",
        required: false
      }]
    }],
    isOpenInput: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "isOpen",
        required: false
      }]
    }],
    isOpenChange: [{
      type: Output,
      args: ["isOpenChange"]
    }],
    isOpen: [{
      type: HostBinding,
      args: ["class.panel-open"]
    }]
  });
})();
var AccordionModule = class _AccordionModule {
  static {
    this.ɵfac = function AccordionModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _AccordionModule,
      imports: [AccordionComponent, AccordionPanelComponent],
      exports: [AccordionComponent, AccordionPanelComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [AccordionPanelComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionModule, [{
    type: NgModule,
    args: [{
      imports: [AccordionComponent, AccordionPanelComponent],
      exports: [AccordionComponent, AccordionPanelComponent]
    }]
  }], null, null);
})();
export {
  AccordionComponent,
  AccordionConfig,
  AccordionModule,
  AccordionPanelComponent
};
//# sourceMappingURL=ngx-bootstrap_accordion.js.map
