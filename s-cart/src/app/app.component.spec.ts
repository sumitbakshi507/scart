import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      const authService = fixture.debugElement.injector.get(AuthService);

      return { fixture, component, authService };
    }

    it('should create the app', () => {
      const fixture = setup();
      const app = fixture.component;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'App Title'`, () => {
      const fixture = setup();
      const app = fixture.component;
      expect(app.title).toEqual('Welcome to SCart');
    });

    it(`should have as initiated`, () => {
      const fixture = setup();
      const app = fixture.component;
      app.ngOnInit();
      expect(app.title).toEqual('Welcome to SCart');
    });

    it(`should have as initiated with authenticated user`, () => {
      const fixture = setup();
      const app = fixture.component;
      const user = new User(1, 'Test');
      spyOnProperty(fixture.authService.user, 'value', 'get').and.returnValue(user);
      app.ngOnInit();
      expect(app.title).toEqual('Welcome to SCart');
    });
  });
});
