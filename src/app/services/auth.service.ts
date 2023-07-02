import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { APIRoute } from 'src/assets/const/common';
import { AppRoute } from '../../assets/const/common';
import { IUser } from '../interfaces/user';
import { environment } from './../../environments/environment.development';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: BehaviorSubject<IUser | null> = new BehaviorSubject(this.user);
  public userData: Observable<IUser | null> = this.user$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  public login(email: string, password: string) {
    this.loadingService.showGlobal();

    return this.http
      .post<{ token: string }>(`${environment.apiUrl}${APIRoute.AuthLogin}`, { email, password })
      .pipe(
        tap(user => {
          if (user.token) {
            localStorage.setItem('auth_token', user.token);
            this.user$.next(this.user);
            this.router.navigate([AppRoute.AllMeetups]);
          }

          this.loadingService.hideGlobal();
          return null;
        })
      );
  };

  public logout() {
    localStorage.removeItem('auth_token');
    this.user$.next(null);
    this.router.navigate([AppRoute.Login]);
  }

  public registration(email: string, password: string, fio: string) {
    this.loadingService.showGlobal();

    return this.http
      .post<{}>(`${environment.apiUrl}${APIRoute.AuthRegistration}`, { email, password, fio })
      .pipe(
        tap(_ => {
          this.loadingService.hideGlobal()
        })
      );
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

  public get user(): IUser | null {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const user: IUser = this.parseJwt(token);
      return user;
    } else {
      return null;
    }
  }

  public get userValue() {
    return this.user$.value;
  }

  public get token(): string | null {
    return localStorage.getItem('auth_token');
  }
};
