import {
  ComponentLoaderFactory,
  Utils,
  document as document2,
  win
} from "./chunk-QO26NB6J.js";
import {
  CommonModule,
  isPlatformBrowser
} from "./chunk-4UZ7RKL3.js";
import "./chunk-6QR36C7I.js";
import {
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
  afterNextRender,
  effect,
  input,
  output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresolveDocument,
  ɵɵresolveWindow
} from "./chunk-QO6N2U2N.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-JRFR6BLO.js";
import "./chunk-MARUHEWW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-EIB7IA3J.js";

// node_modules/ngx-bootstrap/focus-trap/fesm2022/ngx-bootstrap-focus-trap.mjs
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}
var hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch (e) {
  hasV8BreakIterator = false;
}
var Platform = class _Platform {
  constructor(_platformId) {
    this._platformId = _platformId;
    this.isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : typeof document === "object" && !!document;
    this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
    this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
    this.BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !this.EDGE && !this.TRIDENT;
    this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
    this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
    this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
  }
  static {
    this.ɵfac = function Platform_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Platform)(ɵɵinject(PLATFORM_ID));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _Platform,
      factory: _Platform.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();
var InteractivityChecker = class _InteractivityChecker {
  constructor(_platform) {
    this._platform = _platform;
  }
  /**
   * Gets whether an element is disabled.
   *
   * @param element Element to be checked.
   * @returns Whether the element is disabled.
   */
  isDisabled(element) {
    return element.hasAttribute("disabled");
  }
  /**
   * Gets whether an element is visible for the purposes of interactivity.
   *
   * This will capture states like `display: none` and `visibility: hidden`, but not things like
   * being clipped by an `overflow: hidden` parent or being outside the viewport.
   *
   * @returns Whether the element is visible.
   */
  isVisible(element) {
    return hasGeometry(element) && getComputedStyle(element).visibility === "visible";
  }
  /**
   * Gets whether an element can be reached via Tab key.
   * Assumes that the element has already been checked with isFocusable.
   *
   * @param element Element to be checked.
   * @returns Whether the element is tabbable.
   */
  isTabbable(element) {
    if (!this._platform.isBrowser) {
      return false;
    }
    const frameElement = getFrameElement(getWindow(element));
    if (frameElement) {
      if (getTabIndexValue(frameElement) === -1) {
        return false;
      }
      if (!this.isVisible(frameElement)) {
        return false;
      }
    }
    let nodeName = element.nodeName.toLowerCase();
    let tabIndexValue = getTabIndexValue(element);
    if (element.hasAttribute("contenteditable")) {
      return tabIndexValue !== -1;
    }
    if (nodeName === "iframe" || nodeName === "object") {
      return false;
    }
    if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
      return false;
    }
    if (nodeName === "audio") {
      if (!element.hasAttribute("controls")) {
        return false;
      }
      return tabIndexValue !== -1;
    }
    if (nodeName === "video") {
      if (tabIndexValue === -1) {
        return false;
      }
      if (tabIndexValue !== null) {
        return true;
      }
      return this._platform.FIREFOX || element.hasAttribute("controls");
    }
    return element.tabIndex >= 0;
  }
  /**
   * Gets whether an element can be focused by the user.
   *
   * @param element Element to be checked.
   * @param config The config object with options to customize this method's behavior
   * @returns Whether the element is focusable.
   */
  isFocusable(element, config) {
    return isPotentiallyFocusable(element) && !this.isDisabled(element) && (config?.ignoreVisibility || this.isVisible(element));
  }
  static {
    this.ɵfac = function InteractivityChecker_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InteractivityChecker)(ɵɵinject(Platform));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _InteractivityChecker,
      factory: _InteractivityChecker.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InteractivityChecker, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Platform
  }], null);
})();
function getFrameElement(window2) {
  try {
    return window2.frameElement;
  } catch (e) {
    return null;
  }
}
function hasGeometry(element) {
  return !!(element.offsetWidth || element.offsetHeight || typeof element.getClientRects === "function" && element.getClientRects().length);
}
function isNativeFormElement(element) {
  let nodeName = element.nodeName.toLowerCase();
  return nodeName === "input" || nodeName === "select" || nodeName === "button" || nodeName === "textarea";
}
function isHiddenInput(element) {
  return isInputElement(element) && element.type == "hidden";
}
function isAnchorWithHref(element) {
  return isAnchorElement(element) && element.hasAttribute("href");
}
function isInputElement(element) {
  return element.nodeName.toLowerCase() == "input";
}
function isAnchorElement(element) {
  return element.nodeName.toLowerCase() == "a";
}
function hasValidTabIndex(element) {
  if (!element.hasAttribute("tabindex") || element.tabIndex === void 0) {
    return false;
  }
  let tabIndex = element.getAttribute("tabindex");
  if (tabIndex == "-32768") {
    return false;
  }
  return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
function getTabIndexValue(element) {
  if (!hasValidTabIndex(element)) {
    return null;
  }
  const tabIndex = parseInt(element.getAttribute("tabindex") || "", 10);
  return isNaN(tabIndex) ? -1 : tabIndex;
}
function isPotentiallyTabbableIOS(element) {
  let nodeName = element.nodeName.toLowerCase();
  let inputType = nodeName === "input" && element.type;
  return inputType === "text" || inputType === "password" || nodeName === "select" || nodeName === "textarea";
}
function isPotentiallyFocusable(element) {
  if (isHiddenInput(element)) {
    return false;
  }
  return isNativeFormElement(element) || isAnchorWithHref(element) || element.hasAttribute("contenteditable") || hasValidTabIndex(element);
}
function getWindow(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || window;
}
var FocusTrapManager = class _FocusTrapManager {
  constructor() {
    this._focusTrapStack = [];
  }
  /**
   * Disables the FocusTrap at the top of the stack, and then pushes
   * the new FocusTrap onto the stack.
   */
  register(focusTrap) {
    this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
    let stack = this._focusTrapStack;
    if (stack.length) {
      stack[stack.length - 1]._disable();
    }
    stack.push(focusTrap);
    focusTrap._enable();
  }
  /**
   * Removes the FocusTrap from the stack, and activates the
   * FocusTrap that is the new top of the stack.
   */
  deregister(focusTrap) {
    focusTrap._disable();
    const stack = this._focusTrapStack;
    const i = stack.indexOf(focusTrap);
    if (i !== -1) {
      stack.splice(i, 1);
      if (stack.length) {
        stack[stack.length - 1]._enable();
      }
    }
  }
  static {
    this.ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FocusTrapManager)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FocusTrapManager,
      factory: _FocusTrapManager.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FocusTrap = class {
  /** Whether the focus trap is active. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(value, this._startAnchor);
      this._toggleAnchorTabIndex(value, this._endAnchor);
    }
  }
  constructor(_element, _checker, _injector, _document, deferAnchors = false) {
    this._element = _element;
    this._checker = _checker;
    this._injector = _injector;
    this._document = _document;
    this._hasAttached = false;
    this.startAnchorListener = () => this.focusLastTabbableElement();
    this.endAnchorListener = () => this.focusFirstTabbableElement();
    this._enabled = true;
    if (!deferAnchors) {
      this.attachAnchors();
    }
  }
  /** Destroys the focus trap by cleaning up the anchors. */
  destroy() {
    const startAnchor = this._startAnchor;
    const endAnchor = this._endAnchor;
    if (startAnchor) {
      startAnchor.removeEventListener("focus", this.startAnchorListener);
      if (startAnchor.parentNode) {
        startAnchor.parentNode.removeChild(startAnchor);
      }
    }
    if (endAnchor) {
      endAnchor.removeEventListener("focus", this.endAnchorListener);
      if (endAnchor.parentNode) {
        endAnchor.parentNode.removeChild(endAnchor);
      }
    }
    this._startAnchor = this._endAnchor = null;
    this._hasAttached = false;
  }
  /**
   * Inserts the anchors into the DOM. This is usually done automatically
   * in the constructor, but can be deferred for cases like directives with `*ngIf`.
   * @returns Whether the focus trap managed to attach successfuly. This may not be the case
   * if the target element isn't currently in the DOM.
   */
  attachAnchors() {
    if (this._hasAttached) {
      return true;
    }
    if (!this._startAnchor) {
      this._startAnchor = this._createAnchor();
      this._startAnchor.addEventListener("focus", this.startAnchorListener);
    }
    if (!this._endAnchor) {
      this._endAnchor = this._createAnchor();
      this._endAnchor.addEventListener("focus", this.endAnchorListener);
    }
    if (this._element.parentNode) {
      this._element.parentNode.insertBefore(this._startAnchor, this._element);
      this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
      this._hasAttached = true;
    }
    return this._hasAttached;
  }
  /**
   * Waits for the next render cycle, then either focuses the first element that the
   * user specified, or the first tabbable element.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusInitialElementWhenReady() {
    return new Promise((resolve) => {
      this._executeOnStable(() => resolve(this.focusInitialElement()));
    });
  }
  /**
   * Waits for the next render cycle, then focuses
   * the first tabbable element within the focus trap region.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusFirstTabbableElementWhenReady() {
    return new Promise((resolve) => {
      this._executeOnStable(() => resolve(this.focusFirstTabbableElement()));
    });
  }
  /**
   * Waits for the next render cycle, then focuses
   * the last tabbable element within the focus trap region.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusLastTabbableElementWhenReady() {
    return new Promise((resolve) => {
      this._executeOnStable(() => resolve(this.focusLastTabbableElement()));
    });
  }
  /**
   * Get the specified boundary element of the trapped region.
   * @param bound The boundary to get (start or end of trapped region).
   * @returns The boundary element.
   */
  _getRegionBoundary(bound) {
    let markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], [cdkFocusRegion${bound}], [cdk-focus-${bound}]`);
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
        console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
      } else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) {
        console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
      }
    }
    if (bound == "start") {
      return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
    }
    return markers.length ? markers[markers.length - 1] : this._getLastTabbableElement(this._element);
  }
  /**
   * Focuses the element that should be focused when the focus trap is initialized.
   * @returns Whether focus was moved successfully.
   */
  focusInitialElement() {
    const redirectToElement = this._element.querySelector(`[cdk-focus-initial], [cdkFocusInitial]`);
    if (redirectToElement) {
      if (redirectToElement.hasAttribute(`cdk-focus-initial`)) {
        console.warn(`Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0`, redirectToElement);
      }
      if (!this._checker.isFocusable(redirectToElement)) {
        const focusableChild = this._getFirstTabbableElement(redirectToElement);
        focusableChild?.focus();
        return !!focusableChild;
      }
      redirectToElement.focus();
      return true;
    }
    return this.focusFirstTabbableElement();
  }
  /**
   * Focuses the first tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusFirstTabbableElement() {
    const redirectToElement = this._getRegionBoundary("start");
    if (redirectToElement) {
      redirectToElement.focus();
    }
    return !!redirectToElement;
  }
  /**
   * Focuses the last tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusLastTabbableElement() {
    const redirectToElement = this._getRegionBoundary("end");
    if (redirectToElement) {
      redirectToElement.focus();
    }
    return !!redirectToElement;
  }
  /**
   * Checks whether the focus trap has successfully been attached.
   */
  hasAttached() {
    return this._hasAttached;
  }
  /** Get the first tabbable element from a DOM subtree (inclusive). */
  _getFirstTabbableElement(root) {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }
    let children = root.children || root.childNodes;
    for (let i = 0; i < children.length; i++) {
      let tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(children[i]) : null;
      if (tabbableChild) {
        return tabbableChild;
      }
    }
    return null;
  }
  /** Get the last tabbable element from a DOM subtree (inclusive). */
  _getLastTabbableElement(root) {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }
    let children = root.children || root.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
      let tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(children[i]) : null;
      if (tabbableChild) {
        return tabbableChild;
      }
    }
    return null;
  }
  /** Creates an anchor element. */
  _createAnchor() {
    const anchor = this._document.createElement("div");
    this._toggleAnchorTabIndex(this._enabled, anchor);
    anchor.classList.add("cdk-visually-hidden");
    anchor.classList.add("cdk-focus-trap-anchor");
    anchor.setAttribute("aria-hidden", "true");
    return anchor;
  }
  /**
   * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
   * @param isEnabled Whether the focus trap is enabled.
   * @param anchor Anchor on which to toggle the tabindex.
   */
  _toggleAnchorTabIndex(isEnabled, anchor) {
    isEnabled ? anchor.setAttribute("tabindex", "0") : anchor.removeAttribute("tabindex");
  }
  /**
   * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
   * @param enabled: Whether the anchors should trap Tab.
   */
  toggleAnchors(enabled) {
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(enabled, this._startAnchor);
      this._toggleAnchorTabIndex(enabled, this._endAnchor);
    }
  }
  /** Executes a function after the next render cycle (zoneless-compatible). */
  _executeOnStable(fn) {
    afterNextRender(() => fn(), {
      injector: this._injector
    });
  }
};
var FocusTrapFactory = class _FocusTrapFactory {
  constructor(_checker, _injector, _document) {
    this._checker = _checker;
    this._injector = _injector;
    this._document = _document;
  }
  /**
   * Creates a focus-trapped region around the given element.
   * @param element The element around which focus will be trapped.
   * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
   *     manually by the user.
   * @returns The created focus trap instance.
   */
  create(element, deferCaptureElements = false) {
    return new FocusTrap(element, this._checker, this._injector, this._document, deferCaptureElements);
  }
  static {
    this.ɵfac = function FocusTrapFactory_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FocusTrapFactory)(ɵɵinject(InteractivityChecker), ɵɵinject(Injector), ɵɵinject(DOCUMENT));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FocusTrapFactory,
      factory: _FocusTrapFactory.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: InteractivityChecker
  }, {
    type: Injector
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var FocusTrapDirective = class _FocusTrapDirective {
  /** Whether the focus trap is active. */
  get enabled() {
    return this.focusTrap.enabled;
  }
  set enabled(value) {
    this.focusTrap.enabled = coerceBooleanProperty(value);
  }
  /**
   * Whether the directive should automatically move focus into the trapped region upon
   * initialization and return focus to the previous activeElement upon destruction.
   */
  get autoCapture() {
    return this._autoCapture;
  }
  set autoCapture(value) {
    this._autoCapture = coerceBooleanProperty(value);
  }
  constructor(_elementRef, _focusTrapFactory, _document) {
    this._elementRef = _elementRef;
    this._focusTrapFactory = _focusTrapFactory;
    this._previouslyFocusedElement = null;
    this._autoCapture = false;
    this._document = _document;
    this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
  }
  ngOnDestroy() {
    this.focusTrap.destroy();
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
      this._previouslyFocusedElement = null;
    }
  }
  ngAfterContentInit() {
    this.focusTrap.attachAnchors();
    if (this.autoCapture) {
      this._captureFocus();
    }
  }
  ngDoCheck() {
    if (!this.focusTrap.hasAttached()) {
      this.focusTrap.attachAnchors();
    }
  }
  ngOnChanges(changes) {
    const autoCaptureChange = changes["autoCapture"];
    if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture && this.focusTrap.hasAttached()) {
      this._captureFocus();
    }
  }
  _captureFocus() {
    this._previouslyFocusedElement = this._document.activeElement;
    this.focusTrap.focusInitialElementWhenReady();
  }
  static {
    this.ɵfac = function FocusTrapDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FocusTrapDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(FocusTrapFactory), ɵɵdirectiveInject(DOCUMENT));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FocusTrapDirective,
      selectors: [["", "focusTrap", ""]],
      inputs: {
        enabled: [0, "cdkTrapFocus", "enabled"],
        autoCapture: [0, "cdkTrapFocusAutoCapture", "autoCapture"]
      },
      exportAs: ["focusTrap"],
      features: [ɵɵProvidersFeature([FocusTrapManager, Platform, InteractivityChecker]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapDirective, [{
    type: Directive,
    args: [{
      selector: "[focusTrap]",
      exportAs: "focusTrap",
      standalone: true,
      providers: [FocusTrapManager, Platform, InteractivityChecker]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: FocusTrapFactory
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    enabled: [{
      type: Input,
      args: ["cdkTrapFocus"]
    }],
    autoCapture: [{
      type: Input,
      args: ["cdkTrapFocusAutoCapture"]
    }]
  });
})();
var FocusTrapModule = class _FocusTrapModule {
  static {
    this.ɵfac = function FocusTrapModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FocusTrapModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _FocusTrapModule,
      imports: [CommonModule, FocusTrapDirective],
      exports: [FocusTrapDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FocusTrapDirective],
      exports: [FocusTrapDirective]
    }]
  }], null, null);
})();

// node_modules/ngx-bootstrap/modal/fesm2022/ngx-bootstrap-modal.mjs
var _c0 = ["*"];
var BsModalRef = class _BsModalRef {
  constructor() {
    this.hide = () => void 0;
    this.setClass = () => void 0;
  }
  static {
    this.ɵfac = function BsModalRef_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsModalRef)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsModalRef,
      factory: _BsModalRef.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsModalRef, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], null, null);
})();
var ModalBackdropOptions = class {
  constructor(options) {
    this.animate = true;
    Object.assign(this, options);
  }
};
var ModalOptions = class _ModalOptions {
  static {
    this.ɵfac = function ModalOptions_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalOptions)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ModalOptions,
      factory: _ModalOptions.ɵfac,
      providedIn: "platform"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalOptions, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], null, null);
})();
var modalConfigDefaults = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: false,
  ignoreBackdropClick: false,
  class: "",
  animated: true,
  initialState: {},
  closeInterceptor: void 0
};
var MODAL_CONFIG_DEFAULT_OVERRIDE = new InjectionToken("override-default-config");
var CLASS_NAME = {
  SCROLLBAR_MEASURER: "modal-scrollbar-measure",
  BACKDROP: "modal-backdrop",
  OPEN: "modal-open",
  FADE: "fade",
  IN: "in",
  SHOW: "show"
};
var TRANSITION_DURATIONS = {
  MODAL: 300,
  BACKDROP: 150
};
var DISMISS_REASONS = {
  BACKRDOP: "backdrop-click",
  ESC: "esc",
  BACK: "browser-back-navigation-clicked"
};
var ModalBackdropComponent = class _ModalBackdropComponent {
  get isAnimated() {
    return this._isAnimated;
  }
  set isAnimated(value) {
    this._isAnimated = value;
  }
  get isShown() {
    return this._isShown;
  }
  set isShown(value) {
    this._isShown = value;
    if (value) {
      this.renderer.addClass(this.element.nativeElement, `${CLASS_NAME.SHOW}`);
    } else {
      this.renderer.removeClass(this.element.nativeElement, `${CLASS_NAME.SHOW}`);
    }
  }
  constructor(element, renderer) {
    this._isAnimated = false;
    this._isShown = false;
    this.element = element;
    this.renderer = renderer;
  }
  ngOnInit() {
    if (this.isAnimated) {
      this.renderer.addClass(this.element.nativeElement, `${CLASS_NAME.FADE}`);
      Utils.reflow(this.element.nativeElement);
    }
    this.isShown = true;
  }
  static {
    this.ɵfac = function ModalBackdropComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalBackdropComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalBackdropComponent,
      selectors: [["bs-modal-backdrop"]],
      hostAttrs: [1, "modal-backdrop"],
      decls: 0,
      vars: 0,
      template: function ModalBackdropComponent_Template(rf, ctx) {
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalBackdropComponent, [{
    type: Component,
    args: [{
      selector: "bs-modal-backdrop",
      template: " ",
      host: {
        class: CLASS_NAME.BACKDROP
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], null);
})();
var currentId = 1;
var BsModalService = class _BsModalService {
  constructor(rendererFactory, clf, modalDefaultOption) {
    this.clf = clf;
    this.modalDefaultOption = modalDefaultOption;
    this.onShow = new EventEmitter();
    this.onShown = new EventEmitter();
    this.onHide = new EventEmitter();
    this.onHidden = new EventEmitter();
    this.isBodyOverflowing = false;
    this.originalBodyPadding = 0;
    this.scrollbarWidth = 0;
    this.modalsCount = 0;
    this.lastHiddenId = null;
    this.loaders = [];
    this._focusEl = null;
    this._backdropLoader = this.clf.createLoader();
    this._renderer = rendererFactory.createRenderer(null, null);
    this.config = modalDefaultOption ? Object.assign({}, modalConfigDefaults, modalDefaultOption) : modalConfigDefaults;
  }
  /** Shows a modal */
  show(content, config) {
    this._focusEl = document2.activeElement;
    this.modalsCount++;
    this.lastHiddenId = null;
    this._createLoaders();
    const id = config?.id || currentId++;
    this.config = this.modalDefaultOption ? Object.assign({}, modalConfigDefaults, this.modalDefaultOption, config) : Object.assign({}, modalConfigDefaults, config);
    this.config.id = id;
    this._showBackdrop();
    this.lastDismissReason = void 0;
    return this._showModal(content);
  }
  hide(id) {
    if (this.lastHiddenId === id) {
      return;
    }
    this.lastHiddenId = id;
    if (this.modalsCount === 1 || id == null) {
      this._hideBackdrop();
      this.resetScrollbar();
    }
    this.modalsCount = this.modalsCount >= 1 && id != null ? this.modalsCount - 1 : 0;
    setTimeout(() => {
      this._hideModal(id);
      this.removeLoaders(id);
    }, this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0);
    if (this._focusEl) {
      this._focusEl.focus();
    }
  }
  _showBackdrop() {
    const isBackdropEnabled = this.config.backdrop === true || this.config.backdrop === "static";
    const isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;
    if (this.modalsCount === 1) {
      this.removeBackdrop();
      if (isBackdropEnabled && isBackdropInDOM) {
        this._backdropLoader.attach(ModalBackdropComponent).to("body").show({
          isAnimated: this.config.animated
        });
        this.backdropRef = this._backdropLoader._componentRef;
      }
    }
  }
  _hideBackdrop() {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.isShown = false;
    const duration = this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0;
    setTimeout(() => this.removeBackdrop(), duration);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _showModal(content) {
    const modalLoader = this.loaders[this.loaders.length - 1];
    if (this.config && this.config.providers) {
      for (const provider of this.config.providers) {
        modalLoader.provide(provider);
      }
    }
    const bsModalRef = new BsModalRef();
    const modalContainerRef = modalLoader.provide({
      provide: ModalOptions,
      useValue: this.config
    }).provide({
      provide: BsModalRef,
      useValue: bsModalRef
    }).attach(ModalContainerComponent).to("body");
    bsModalRef.hide = () => modalContainerRef.instance?.hide();
    bsModalRef.setClass = (newClass) => {
      if (modalContainerRef.instance) {
        modalContainerRef.instance.config.class = newClass;
      }
    };
    bsModalRef.onHidden = new EventEmitter();
    bsModalRef.onHide = new EventEmitter();
    this.copyEvent(modalLoader.onBeforeHide, bsModalRef.onHide);
    this.copyEvent(modalLoader.onHidden, bsModalRef.onHidden);
    modalContainerRef.show({
      content,
      isAnimated: this.config.animated,
      initialState: this.config.initialState,
      bsModalService: this,
      id: this.config.id
    });
    if (modalContainerRef.instance) {
      modalContainerRef.instance.level = this.getModalsCount();
      bsModalRef.content = modalLoader.getInnerComponent();
      bsModalRef.id = modalContainerRef.instance.config?.id;
    }
    return bsModalRef;
  }
  _hideModal(id) {
    if (id != null) {
      const indexToRemove = this.loaders.findIndex((loader) => loader.instance?.config.id === id);
      const modalLoader = this.loaders[indexToRemove];
      if (modalLoader) {
        modalLoader.hide(id);
      }
    } else {
      this.loaders.forEach((loader) => {
        if (loader.instance) {
          loader.hide(loader.instance.config.id);
        }
      });
    }
  }
  getModalsCount() {
    return this.modalsCount;
  }
  setDismissReason(reason) {
    this.lastDismissReason = reason;
  }
  removeBackdrop() {
    this._renderer.removeClass(document2.body, CLASS_NAME.OPEN);
    this._renderer.setStyle(document2.body, "overflow-y", "");
    this._backdropLoader.hide();
    this.backdropRef = void 0;
  }
  /** Checks if the body is overflowing and sets scrollbar width */
  /** @internal */
  checkScrollbar() {
    this.isBodyOverflowing = document2.body.clientWidth < window.innerWidth;
    this.scrollbarWidth = this.getScrollbarWidth();
  }
  setScrollbar() {
    if (!document2) {
      return;
    }
    this.originalBodyPadding = parseInt(window.getComputedStyle(document2.body).getPropertyValue("padding-right") || "0", 10);
    if (this.isBodyOverflowing) {
      document2.body.style.paddingRight = `${this.originalBodyPadding + this.scrollbarWidth}px`;
    }
  }
  resetScrollbar() {
    document2.body.style.paddingRight = `${this.originalBodyPadding}px`;
  }
  // thx d.walsh
  getScrollbarWidth() {
    const scrollDiv = this._renderer.createElement("div");
    this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
    this._renderer.appendChild(document2.body, scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this._renderer.removeChild(document2.body, scrollDiv);
    return scrollbarWidth;
  }
  _createLoaders() {
    const loader = this.clf.createLoader();
    this.copyEvent(loader.onBeforeShow, this.onShow);
    this.copyEvent(loader.onShown, this.onShown);
    this.copyEvent(loader.onBeforeHide, this.onHide);
    this.copyEvent(loader.onHidden, this.onHidden);
    this.loaders.push(loader);
  }
  removeLoaders(id) {
    if (id != null) {
      const indexToRemove = this.loaders.findIndex((loader) => loader.instance?.config.id === id);
      if (indexToRemove >= 0) {
        this.loaders.splice(indexToRemove, 1);
        this.loaders.forEach((loader, i) => {
          if (loader.instance) {
            loader.instance.level = i + 1;
          }
        });
      }
    } else {
      this.loaders.splice(0, this.loaders.length);
    }
  }
  copyEvent(from, to) {
    from.subscribe((data) => {
      to.emit(this.lastDismissReason || data);
    });
  }
  static {
    this.ɵfac = function BsModalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BsModalService)(ɵɵinject(RendererFactory2), ɵɵinject(ComponentLoaderFactory), ɵɵinject(MODAL_CONFIG_DEFAULT_OVERRIDE, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BsModalService,
      factory: _BsModalService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsModalService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: ComponentLoaderFactory
  }, {
    type: ModalOptions,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MODAL_CONFIG_DEFAULT_OVERRIDE]
    }]
  }], null);
})();
var ModalContainerComponent = class _ModalContainerComponent {
  constructor(options, _element, _renderer) {
    this._element = _element;
    this._renderer = _renderer;
    this.isShown = false;
    this.isAnimated = false;
    this._focusEl = null;
    this.isModalHiding = false;
    this.clickStartedInContent = false;
    this.config = Object.assign({}, options);
  }
  ngOnInit() {
    this._focusEl = document2.activeElement;
    if (this.isAnimated) {
      this._renderer.addClass(this._element.nativeElement, CLASS_NAME.FADE);
    }
    this._renderer.setStyle(this._element.nativeElement, "display", "block");
    setTimeout(() => {
      this.isShown = true;
      this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
    }, this.isAnimated ? TRANSITION_DURATIONS.BACKDROP : 0);
    if (document2 && document2.body) {
      if (this.bsModalService && this.bsModalService.getModalsCount() === 1) {
        this.bsModalService.checkScrollbar();
        this.bsModalService.setScrollbar();
      }
      this._renderer.addClass(document2.body, CLASS_NAME.OPEN);
      this._renderer.setStyle(document2.body, "overflow-y", "hidden");
    }
    if (this._element.nativeElement) {
      this._element.nativeElement.focus();
    }
  }
  onClickStarted(event) {
    if (!(event.target instanceof Element)) {
      this.clickStartedInContent = false;
      return;
    }
    this.clickStartedInContent = event.target !== this._element.nativeElement;
  }
  onClickStop(event) {
    if (!(event.target instanceof Element)) {
      this.clickStartedInContent = false;
      return;
    }
    const clickedInBackdrop = event.target === this._element.nativeElement && !this.clickStartedInContent;
    if (this.config.ignoreBackdropClick || this.config.backdrop === "static" || !clickedInBackdrop) {
      this.clickStartedInContent = false;
      return;
    }
    this.bsModalService?.setDismissReason(DISMISS_REASONS.BACKRDOP);
    this.hide();
  }
  onPopState() {
    this.bsModalService?.setDismissReason(DISMISS_REASONS.BACK);
    this.hide();
  }
  onEsc(event) {
    if (!this.isShown) {
      return;
    }
    const keyboardEvent = event;
    const hasKeyCode = (e) => "keyCode" in e;
    const isEscape = keyboardEvent.key === "Escape" || keyboardEvent.key === "Esc" || hasKeyCode(keyboardEvent) && keyboardEvent.keyCode === 27;
    if (!isEscape) {
      return;
    }
    keyboardEvent.preventDefault();
    if (this.config.keyboard && this.level === this.bsModalService?.getModalsCount()) {
      this.bsModalService?.setDismissReason(DISMISS_REASONS.ESC);
      this.hide();
    }
  }
  ngOnDestroy() {
    if (this.isShown) {
      this._hide();
    }
  }
  hide() {
    if (this.isModalHiding) {
      return;
    }
    if (this.config.closeInterceptor) {
      this.config.closeInterceptor().then(() => this._hide(), () => void 0);
      return;
    }
    this._hide();
  }
  _hide() {
    this.isModalHiding = true;
    this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
    setTimeout(() => {
      this.isShown = false;
      this.bsModalService?.hide(this.config.id);
      if (document2 && document2.body && this.bsModalService?.getModalsCount() === 0) {
        this._renderer.removeClass(document2.body, CLASS_NAME.OPEN);
        this._renderer.setStyle(document2.body, "overflow-y", "");
      }
      this.bsModalService?.hide(this.config.id);
      this.isModalHiding = false;
      if (this._focusEl) {
        this._focusEl.focus();
      }
    }, this.isAnimated ? TRANSITION_DURATIONS.MODAL : 0);
  }
  static {
    this.ɵfac = function ModalContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalContainerComponent)(ɵɵdirectiveInject(ModalOptions), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalContainerComponent,
      selectors: [["modal-container"]],
      hostAttrs: ["role", "dialog", "tabindex", "-1", 1, "modal"],
      hostVars: 3,
      hostBindings: function ModalContainerComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousedown", function ModalContainerComponent_mousedown_HostBindingHandler($event) {
            return ctx.onClickStarted($event);
          })("click", function ModalContainerComponent_click_HostBindingHandler($event) {
            return ctx.onClickStop($event);
          })("popstate", function ModalContainerComponent_popstate_HostBindingHandler() {
            return ctx.onPopState();
          }, ɵɵresolveWindow)("keydown.esc", function ModalContainerComponent_keydown_esc_HostBindingHandler($event) {
            return ctx.onEsc($event);
          }, ɵɵresolveWindow);
        }
        if (rf & 2) {
          ɵɵattribute("aria-modal", true)("aria-labelledby", ctx.config.ariaLabelledBy)("aria-describedby", ctx.config.ariaDescribedby);
        }
      },
      features: [ɵɵProvidersFeature([BsModalService])],
      ngContentSelectors: _c0,
      decls: 3,
      vars: 2,
      consts: [["role", "document", "focusTrap", ""], [1, "modal-content"]],
      template: function ModalContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "div", 0)(1, "div", 1);
          ɵɵprojection(2);
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵclassMap("modal-dialog" + (ctx.config.class ? " " + ctx.config.class : ""));
        }
      },
      dependencies: [FocusTrapDirective],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalContainerComponent, [{
    type: Component,
    args: [{
      selector: "modal-container",
      template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')"
         role="document"
         focusTrap>
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
      host: {
        class: "modal",
        role: "dialog",
        tabindex: "-1",
        "[attr.aria-modal]": "true",
        "[attr.aria-labelledby]": "config.ariaLabelledBy",
        "[attr.aria-describedby]": "config.ariaDescribedby"
      },
      standalone: true,
      imports: [FocusTrapDirective],
      providers: [BsModalService]
    }]
  }], () => [{
    type: ModalOptions
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    onClickStarted: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    onClickStop: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onPopState: [{
      type: HostListener,
      args: ["window:popstate"]
    }],
    onEsc: [{
      type: HostListener,
      args: ["window:keydown.esc", ["$event"]]
    }]
  });
})();
var TRANSITION_DURATION = 300;
var BACKDROP_TRANSITION_DURATION = 150;
var ModalDirective = class _ModalDirective {
  get config() {
    return this._config;
  }
  get isShown() {
    return this._isShown;
  }
  constructor(_element, _viewContainerRef, _renderer, clf, modalDefaultOption) {
    this._element = _element;
    this._renderer = _renderer;
    this.configInput = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "configInput"
    } : {}), {
      alias: "config"
    }));
    this.closeInterceptor = input(...ngDevMode ? [void 0, {
      debugName: "closeInterceptor"
    }] : []);
    this.onShow = output();
    this.onShown = output();
    this.onHide = output();
    this.onHidden = output();
    this._isShown = false;
    this.isBodyOverflowing = false;
    this.originalBodyPadding = 0;
    this.scrollbarWidth = 0;
    this.timerHideModal = 0;
    this.timerRmBackDrop = 0;
    this.isNested = false;
    this.clickStartedInContent = false;
    this._focusEl = null;
    this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
    this._config = modalDefaultOption || modalConfigDefaults;
    effect(() => {
      const conf = this.configInput();
      if (conf) {
        this._config = this.getConfig(conf);
      }
    });
  }
  onClickStarted(event) {
    if (!(event.target instanceof Element)) {
      this.clickStartedInContent = false;
      return;
    }
    this.clickStartedInContent = event.target !== this._element.nativeElement;
  }
  onClickStop(event) {
    if (!(event.target instanceof Element)) {
      this.clickStartedInContent = false;
      return;
    }
    const clickedInBackdrop = event.target === this._element.nativeElement && !this.clickStartedInContent;
    if (this.config.ignoreBackdropClick || this.config.backdrop === "static" || !clickedInBackdrop) {
      this.clickStartedInContent = false;
      return;
    }
    this.dismissReason = DISMISS_REASONS.BACKRDOP;
    this.hide(event);
  }
  // Handle Escape key: listen on document and cast event to KeyboardEvent.
  onEsc(event) {
    if (!this._isShown) {
      return;
    }
    const keyboardEvent = event;
    const hasKeyCode = (e) => "keyCode" in e;
    const isEscape = keyboardEvent.key === "Escape" || keyboardEvent.key === "Esc" || hasKeyCode(keyboardEvent) && keyboardEvent.keyCode === 27;
    if (!isEscape) {
      return;
    }
    keyboardEvent.preventDefault();
    if (this.config.keyboard) {
      this.dismissReason = DISMISS_REASONS.ESC;
      this.hide();
    }
  }
  ngOnDestroy() {
    if (this._isShown) {
      this._isShown = false;
      this.hideModal();
      this._backdrop.dispose();
    }
  }
  ngOnInit() {
    this._config = this._config || this.getConfig();
    setTimeout(() => {
      if (this._config.show) {
        this.show();
      }
    }, 0);
  }
  /* Public methods */
  /** Allows to manually toggle modal visibility */
  toggle() {
    return this._isShown ? this.hide() : this.show();
  }
  /** Allows to manually open modal */
  show() {
    this.dismissReason = void 0;
    this.onShow.emit(this);
    if (this._isShown) {
      return;
    }
    clearTimeout(this.timerHideModal);
    clearTimeout(this.timerRmBackDrop);
    this._isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    if (document2 && document2.body) {
      if (document2.body.classList.contains(CLASS_NAME.OPEN)) {
        this.isNested = true;
      } else {
        this._renderer.addClass(document2.body, CLASS_NAME.OPEN);
        this._renderer.setStyle(document2.body, "overflow-y", "hidden");
      }
    }
    this.showBackdrop(() => {
      this.showElement();
    });
  }
  /** Check if we can close the modal */
  hide(event) {
    if (!this._isShown) {
      return;
    }
    if (event) {
      event.preventDefault();
    }
    if (this.config.closeInterceptor) {
      this.config.closeInterceptor().then(() => this._hide(), () => void 0);
      return;
    }
    this._hide();
  }
  /** Private methods @internal */
  /**
   *  Manually close modal
   *  @internal
   */
  _hide() {
    this.onHide.emit(this);
    win.clearTimeout(this.timerHideModal);
    win.clearTimeout(this.timerRmBackDrop);
    this._isShown = false;
    this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
    if (this._config.animated) {
      this.timerHideModal = win.setTimeout(() => this.hideModal(), TRANSITION_DURATION);
    } else {
      this.hideModal();
    }
    if (this._focusEl) {
      this._focusEl.focus();
    }
  }
  getConfig(config) {
    return Object.assign({}, this._config, config);
  }
  /**
   *  Show dialog
   *  @internal
   */
  showElement() {
    if (!this._element.nativeElement.parentNode || this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
      if (document2 && document2.body) {
        document2.body.appendChild(this._element.nativeElement);
      }
    }
    this._renderer.setAttribute(this._element.nativeElement, "aria-hidden", "false");
    this._renderer.setAttribute(this._element.nativeElement, "aria-modal", "true");
    this._renderer.setStyle(this._element.nativeElement, "display", "block");
    this._renderer.setProperty(this._element.nativeElement, "scrollTop", 0);
    if (this._config.animated) {
      Utils.reflow(this._element.nativeElement);
    }
    this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.nativeElement.focus();
      }
      this.onShown.emit(this);
    };
    if (this._config.animated) {
      setTimeout(transitionComplete, TRANSITION_DURATION);
    } else {
      transitionComplete();
    }
  }
  /** @internal */
  hideModal() {
    this._renderer.setAttribute(this._element.nativeElement, "aria-hidden", "true");
    this._renderer.setStyle(this._element.nativeElement, "display", "none");
    this.showBackdrop(() => {
      if (!this.isNested) {
        if (document2 && document2.body) {
          this._renderer.removeClass(document2.body, CLASS_NAME.OPEN);
          this._renderer.setStyle(document2.body, "overflow-y", "");
        }
        this.resetScrollbar();
      }
      this.resetAdjustments();
      this.focusOtherModal();
      this.onHidden.emit(this);
    });
  }
  // todo: original show was calling a callback when done, but we can use
  // promise
  /** @internal */
  showBackdrop(callback) {
    if (this._isShown && this.config.backdrop && (!this.backdrop || !this.backdrop.instance.isShown)) {
      this.removeBackdrop();
      this._backdrop.attach(ModalBackdropComponent).to("body").show({
        isAnimated: this._config.animated
      });
      this.backdrop = this._backdrop._componentRef;
      if (!callback) {
        return;
      }
      if (!this._config.animated) {
        callback();
        return;
      }
      setTimeout(callback, BACKDROP_TRANSITION_DURATION);
    } else if (!this._isShown && this.backdrop) {
      this.backdrop.instance.isShown = false;
      const callbackRemove = () => {
        this.removeBackdrop();
        if (callback) {
          callback();
        }
      };
      if (this.backdrop.instance.isAnimated) {
        this.timerRmBackDrop = win.setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      callback();
    }
  }
  /** @internal */
  removeBackdrop() {
    this._backdrop.hide();
  }
  /** Events tricks */
  // no need for it
  // protected setEscapeEvent():void {
  //   if (this._isShown && this._config.keyboard) {
  //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
  //       if (event.which === 27) {
  //         this.hide()
  //       }
  //     })
  //
  //   } else if (!this._isShown) {
  //     $(this._element).off(Event.KEYDOWN_DISMISS)
  //   }
  // }
  // protected setResizeEvent():void {
  // console.log(this.renderer.listenGlobal('', Event.RESIZE));
  // if (this._isShown) {
  //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
  // } else {
  //   $(window).off(Event.RESIZE)
  // }
  // }
  focusOtherModal() {
    if (this._element.nativeElement.parentElement == null) {
      return;
    }
    const otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll(".in[bsModal]");
    if (!otherOpenedModals.length) {
      return;
    }
    otherOpenedModals[otherOpenedModals.length - 1].focus();
  }
  /** @internal */
  resetAdjustments() {
    this._renderer.setStyle(this._element.nativeElement, "paddingLeft", "");
    this._renderer.setStyle(this._element.nativeElement, "paddingRight", "");
  }
  /** Scroll bar tricks */
  /** @internal */
  checkScrollbar() {
    this.isBodyOverflowing = document2.body.clientWidth < win.innerWidth;
    this.scrollbarWidth = this.getScrollbarWidth();
  }
  setScrollbar() {
    if (!document2) {
      return;
    }
    this.originalBodyPadding = parseInt(win.getComputedStyle(document2.body).getPropertyValue("padding-right") || 0, 10);
    if (this.isBodyOverflowing) {
      document2.body.style.paddingRight = `${this.originalBodyPadding + this.scrollbarWidth}px`;
    }
  }
  resetScrollbar() {
    document2.body.style.paddingRight = `${this.originalBodyPadding}px`;
  }
  // thx d.walsh
  getScrollbarWidth() {
    const scrollDiv = this._renderer.createElement("div");
    this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
    this._renderer.appendChild(document2.body, scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this._renderer.removeChild(document2.body, scrollDiv);
    return scrollbarWidth;
  }
  static {
    this.ɵfac = function ModalDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(MODAL_CONFIG_DEFAULT_OVERRIDE, 8));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ModalDirective,
      selectors: [["", "bsModal", ""]],
      hostBindings: function ModalDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousedown", function ModalDirective_mousedown_HostBindingHandler($event) {
            return ctx.onClickStarted($event);
          })("mouseup", function ModalDirective_mouseup_HostBindingHandler($event) {
            return ctx.onClickStop($event);
          })("keydown", function ModalDirective_keydown_HostBindingHandler($event) {
            return ctx.onEsc($event);
          }, ɵɵresolveDocument);
        }
      },
      inputs: {
        configInput: [1, "config", "configInput"],
        closeInterceptor: [1, "closeInterceptor"]
      },
      outputs: {
        onShow: "onShow",
        onShown: "onShown",
        onHide: "onHide",
        onHidden: "onHidden"
      },
      exportAs: ["bs-modal"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalDirective, [{
    type: Directive,
    args: [{
      selector: "[bsModal]",
      exportAs: "bs-modal",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ViewContainerRef
  }, {
    type: Renderer2
  }, {
    type: ComponentLoaderFactory
  }, {
    type: ModalOptions,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MODAL_CONFIG_DEFAULT_OVERRIDE]
    }]
  }], {
    configInput: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "config",
        required: false
      }]
    }],
    closeInterceptor: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "closeInterceptor",
        required: false
      }]
    }],
    onShow: [{
      type: Output,
      args: ["onShow"]
    }],
    onShown: [{
      type: Output,
      args: ["onShown"]
    }],
    onHide: [{
      type: Output,
      args: ["onHide"]
    }],
    onHidden: [{
      type: Output,
      args: ["onHidden"]
    }],
    onClickStarted: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    onClickStop: [{
      type: HostListener,
      args: ["mouseup", ["$event"]]
    }],
    onEsc: [{
      type: HostListener,
      args: ["document:keydown", ["$event"]]
    }]
  });
})();
var ModalModule = class _ModalModule {
  static {
    this.ɵfac = function ModalModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ModalModule,
      imports: [FocusTrapModule, ModalBackdropComponent, ModalDirective, ModalContainerComponent],
      exports: [ModalBackdropComponent, ModalDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [FocusTrapModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalModule, [{
    type: NgModule,
    args: [{
      imports: [FocusTrapModule, ModalBackdropComponent, ModalDirective, ModalContainerComponent],
      exports: [ModalBackdropComponent, ModalDirective]
    }]
  }], null, null);
})();
export {
  BsModalRef,
  BsModalService,
  MODAL_CONFIG_DEFAULT_OVERRIDE,
  ModalBackdropComponent,
  ModalBackdropOptions,
  ModalContainerComponent,
  ModalDirective,
  ModalModule,
  ModalOptions
};
//# sourceMappingURL=ngx-bootstrap_modal.js.map
