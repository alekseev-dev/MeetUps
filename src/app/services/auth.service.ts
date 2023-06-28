import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, delay, interval, map, of, take, tap } from 'rxjs';
import { APIRoute } from 'src/assets/const/common';
import { AppRoute } from '../../assets/const/common';
import { IUser } from '../interfaces/user';
import { environment } from './../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: BehaviorSubject<IUser | null> = new BehaviorSubject(this.user);
  public userData: Observable<IUser | null> = this.user$.asObservable();

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
            this.user$.next(this.user);
            this.router.navigate([AppRoute.AllMeetups]);
          }

          return null;
        })
      );
  };

  public isEmailExist(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(1000),
      map((email) => {
        const emails = ['test@mail.ru', 'asd@mail.ru'];
        return emails.includes(email)
      })
    )
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.user$.next(null);
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

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //45

function sumArray(array: number[], delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sum = array.reduce((acc, curr) => acc + curr, 0);
      if (Number.isNaN(sum)) {
        reject(new Error('Некорректный массив'));
      } else {
        resolve(sum);
      }
    }, delay);
  });
}

sumArray(array, 2000)
  .then(result => console.log(`Сумма элементов массива: ${result}`))
  .catch(error => console.error(error));

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
interval(1000)
  .pipe(
    take(5),
    map((value) => value * 10),
    tap((value) => console.log(`Получено значение: ${value}`)),
    delay(500)
  )
  .subscribe((result) => console.log(`Итоговое значение: ${result}`));
