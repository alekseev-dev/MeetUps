import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIRoute, Role } from 'src/assets/const/common';
import { IUserlistItem } from '../interfaces/user';
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

  public createUser(email: string, password: string, role: Role) {
    const users = this.usersSubject.getValue()

    users.push({
      createdAt: '',
      email: '',
      fio: '',
      id: 1,
      password: '',
      roles: [],
      updatedAt: '',
    })
    console.log('users:', users)
    this.usersSubject.next(users)
  }
}
