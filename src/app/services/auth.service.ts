import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { APIRoute } from 'src/assets/const/common';
import { AppRoute } from '../../assets/const/common';
import { environment } from './../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}${APIRoute.AuthLogin}`, { email, password })
      .pipe(
        tap(user => {
          if (user.token) {
            localStorage.setItem('auth_token', user.token);
            this.router.navigate([`${AppRoute.User}${AppRoute.AllMeetups}`]);
          }

          return null;
        })
      );
  };

  public logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate([AppRoute.Login]);
  }

  public registration(email: string, password: string) {
    return this.http
      .post<{}>(`${environment.apiUrl}${APIRoute.AuthRegistration}`, { email, password });
  }

  public parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get user(): string | null {
    const token = localStorage.getItem('del_to_do_auth_token');
    if (token) {
      const user: string = this.parseJwt(token);
      return user;
    } else {
      return null;
    }
  }

  public get token(): string | null {
    return localStorage.getItem('auth_token');
  }
};
