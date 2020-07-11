import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from 'src/app/services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));


  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(HeaderComponent);
      const component = fixture.componentInstance;
      const cartService = fixture.debugElement.injector.get(CartService);

      return { fixture, component, cartService };
    }

    beforeEach(() => {
      const setupObj = setup();
      component = setupObj.component;
      setupObj.fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

});
