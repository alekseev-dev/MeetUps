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
        console.log(user);
      })
  };

  public updateUserRole(userId: number, name: string) {
    console.log(name);

    return this.http
      .put<IUserItemDelete>(`${environment.apiUrl}${APIRoute.UserRole}`, { name, userId })
      .subscribe(user => {
        console.log(user);
      })
  };

  // public updateUserRole(id: number, email: string, password: string, fio: string) {
  //   return this.http
  //     .put<IUserItemDelete>(`${environment.apiUrl}${APIRoute.User}/${id}`, { email, password, fio })
  //     .subscribe(user => {
  //       console.log(user);
  //     })
  // };
}
