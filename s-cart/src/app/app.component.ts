import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Welcome to SCart';
  userSubs: Subscription;
  isAuthenticated: boolean;

  constructor(
    private titleService: Title,
    private route: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
      this.authService.autoLogin();
      this.titleService.setTitle(this.title);
      this.userSubs = this.authService.user.subscribe((user: User) => {
        this.isAuthenticated = !!user;
        if (!this.isAuthenticated) {
          this.route.navigate(['auth']);
        }
        if (this.isAuthenticated) {
          this.route.navigate(['']);
        }
      });
  }

  ngOnDestroy() {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
