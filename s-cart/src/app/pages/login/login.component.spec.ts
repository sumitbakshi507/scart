import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(LoginComponent);
      const authService = fixture.debugElement.injector.get(AuthService);
      const component = fixture.componentInstance;

      return { fixture, component, authService };
    }

    function updateForm(userEmail, userPassword) {
      component.form.controls['username'].setValue(userEmail);
      component.form.controls['password'].setValue(userPassword);
    }
    beforeEach(() => {
      const setupObj = setup();
      fixture = setupObj.fixture;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
