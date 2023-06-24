import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIRoute } from 'src/assets/const/common';
import { environment } from 'src/environments/environment';
import { IMeetupData } from '../interfaces/meetup-data';
import { adaptToClient } from './../../assets/utils/utils';

@Injectable({
  providedIn: 'root'
})

export class MeetupsService {
  private meetupsSubject = new BehaviorSubject<IMeetupData[]>([]);
  public meetups$ = this.meetupsSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  public getMeetups() {
    return this.http
      .get<IMeetupData[]>(`${environment.apiUrl}${APIRoute.Meetup}`)
      .subscribe(
        (meetups => {
          this.meetupsSubject.next(adaptToClient(meetups));
          console.log('data', adaptToClient(meetups));
        }))
  };
}
