import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIRoute } from 'src/assets/const/common';
import { IUserItemDelete, IUserlistItem } from '../interfaces/user';
import { environment } from './../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject = new BehaviorSubject<IUserlistItem[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers() {
    return this.http
      .get<IUserlistItem[]>(`${environment.apiUrl}${APIRoute.User}`)
      .subscribe(
        (users => {
          this.usersSubject.next(users);
          console.log(users);

        }))
  };

  public deleteUser(id: number) {
    return this.http
      .delete<IUserItemDelete>(`${environment.apiUrl}${APIRoute.User}/${id}`, { body: { id } })
      .subscribe(user => {
        const previousValue = this.usersSubject.getValue();
        const updatedValue = previousValue.filter(item => item.id !== user.id);

        this.usersSubject.next(updatedValue);
      })
  };

  public updateUserInfo(id: number, email: string, password: string) {
    return this.http
      .put<IUserItemDelete>(`${environment.apiUrl}${APIRoute.User}/${id}`, { email, password })
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
        }
      });
  }

  public updateUserRole(userId: number, names: string[]) {
    console.log({ names, userId });

    return this.http
      .post<{ names: string[], userId: string }>(`${environment.apiUrl}${APIRoute.UserRole}`, { names, userId })
      .subscribe()
  };
}
