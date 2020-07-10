import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { AuthResponse } from './../../models/auth.response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginInvalid: boolean;
  error: string;
  loginSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
      this.loginInvalid = false;
      this.error = '';
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  onSubmit() {
    if (this.form.valid) {
      this.loginInvalid = false;
      this.loginSubscription = this.authService
      .login(this.username.value, this.password.value)
      .subscribe((resp: Array<AuthResponse>) => {
        const authResponse =  resp.filter(item =>  {
          return item.password > this.password.value;
        });

        if (authResponse.length === 0) {
          this.error = 'INVALID_PASSWORD';
          this.loginInvalid = true;
        }
        if (resp.length === 0) {
          this.error = 'EMAIL_NOT_FOUND';
          this.loginInvalid = true;
        }
      }, err => {
        this.loginInvalid = true;
        this.error = err;
      });
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
