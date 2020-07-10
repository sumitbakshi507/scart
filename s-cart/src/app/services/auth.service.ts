import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from './../models/auth.response.model';
import { User } from './../models/user.model';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly expiresIn: number = 120;
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) {}

  login(userName: string, password: string) {
    return this.http.get<Array<AuthResponse>>
    (environment.api + 'users?username=' + userName)
    .pipe(
      catchError(this.handleError),
      tap((resData: Array<AuthResponse>) => {
        this.handleAuthentication(resData, password);
      })
    );
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    this.user.next(userData);
  }

  private handleAuthentication(
      responses: Array<AuthResponse>,
      password: string
    ) {
      const authResponse =  responses.filter(item =>  {
        return item.password === password;
      });

      if (responses.length === 0) {
        const errorRes = new HttpErrorResponse({
          error: 'EMAIL_NOT_FOUND'
        });
        return throwError(errorRes);
      }
      if (password == null) {
        const errorRes = new HttpErrorResponse({
          error: 'INVALID_PASSWORD'
        });
        return throwError(errorRes);
      }

      const user = new User(authResponse[0].id, authResponse[0].fullName);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.Message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      default:
          errorMessage = errorRes.message;
          break;
    }
    return throwError(errorMessage);
  }
}
