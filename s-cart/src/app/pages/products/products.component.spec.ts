import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ ProductsComponent ]
    })
    .compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(ProductsComponent);
      const productService = fixture.debugElement.injector.get(ProductService);
      const component = fixture.componentInstance;

      return { fixture, component, productService };
    }

    beforeEach(() => {
      const setupObj = setup();
      fixture = setupObj.fixture;
      component = setupObj.component;
      setupObj.fixture.detectChanges();
    });

    it('should create', () => {
      component.ngOnInit();
      expect(component).toBeTruthy();
    });
  });
});
