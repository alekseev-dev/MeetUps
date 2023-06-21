import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIRoute } from 'src/assets/const/common';
import { environment } from './../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers() {
    return this.http.get<any>(`${environment.apiUrl}${APIRoute.User}`);
  }

  public addRole(token: string) {
    return this.http.put<any>(`${environment.apiUrl}${APIRoute.UserRole}`, { token });
  }

  public getRoles(token: string) {
    return this.http.post<any>(`${environment.apiUrl}${APIRoute.UserRole}`, { token });
  }

  public updateRole(id: number, token: string) {
    return this.http.put<any>(`${environment.apiUrl}${APIRoute.User}/${id}`, { id, token });
  }

  public deleteUser(id: number, token: string) {
    return this.http.delete<any>(`${environment.apiUrl}${APIRoute.User}/${id}`);
  }
}
