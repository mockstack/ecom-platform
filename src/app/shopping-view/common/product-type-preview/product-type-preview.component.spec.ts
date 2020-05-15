import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypePreviewComponent } from './product-type-preview.component';

describe('ProductTypePreviewComponent', () => {
  let component: ProductTypePreviewComponent;
  let fixture: ComponentFixture<ProductTypePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
