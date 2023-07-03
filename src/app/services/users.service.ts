import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, catchError, interval, throwError } from 'rxjs';
import { APIRoute } from 'src/assets/const/common';
import { IUserItemDelete, IUserlistItem } from '../interfaces/user';
import { environment } from './../../environments/environment.development';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private usersSubject = new BehaviorSubject<IUserlistItem[]>([]);
  public users$ = this.usersSubject.asObservable();
  private intervalSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
  }

  public getUsers() {
    this.fetchUsers();

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(100000)
      .subscribe(() => this.fetchUsers());
  }

  public fetchUsers() {
    this.loadingService.showGlobal();

    return this.http
      .get<IUserlistItem[]>(`${environment.apiUrl}${APIRoute.User}`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred while fetch users:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
      .subscribe(
        (users => {
          this.usersSubject.next(users);
          this.loadingService.hideGlobal();
        }))
  };

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  public deleteUser(id: number) {
    this.loadingService.showGlobal();

    return this.http
      .delete<IUserItemDelete>(`${environment.apiUrl}${APIRoute.User}/${id}`, { body: { id } })
      .pipe(
        catchError((error) => {
          console.error('An error occurred while delete user:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
      .subscribe(user => {
        const previousValue = this.usersSubject.getValue();
        const updatedValue = previousValue.filter(item => item.id !== user.id);

        this.usersSubject.next(updatedValue);
        this.loadingService.hideGlobal();
      })
  };

  public updateUserInfo(id: number, email: string, password: string) {
    this.loadingService.showGlobal();

    return this.http
      .put<IUserItemDelete>(`${environment.apiUrl}${APIRoute.User}/${id}`, { email, password })
      .pipe(
        catchError((error) => {
          console.error('An error occurred while update user info:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
      .subscribe(user => {
        const previousValue = this.usersSubject.getValue();
        const index = previousValue.findIndex(item => item.id === id);

        if (index !== -1) {
          const updatedItem = {
            ...previousValue[index],
            email,
          };

          const newArray = [
            ...previousValue.slice(0, index),
            updatedItem,
            ...previousValue.slice(index + 1),
          ];

          this.usersSubject.next(newArray);
          this.loadingService.hideGlobal();
        }
      });
  }

  public updateUserRole(userId: number, names: string[]) {
    this.loadingService.showGlobal();

    return this.http
      .post<{ names: string[], userId: string }>(`${environment.apiUrl}${APIRoute.UserRole}`, { names, userId })
      .pipe(
        catchError((error) => {
          console.error('An error occurred while update user role:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
      .subscribe(_ => this.loadingService.hideGlobal())
  };
}
