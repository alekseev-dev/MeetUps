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
        })
      )
  };

  public subscribeToMeetup(idMeetup: number, idUser: number) {
    return this.http
      .put<IMeetupData>(`${environment.apiUrl}${APIRoute.Meetup}`, { idMeetup, idUser })
      .subscribe(
        (patchedMeetupCard => {
          const previousValue = this.meetupsSubject.getValue();
          const index = previousValue.findIndex(item => item.id === idMeetup);

          this.meetupsSubject.next([
            ...previousValue.slice(0, index),
            patchedMeetupCard,
            ...previousValue.slice(index + 1),
          ])
        })
      )
  }

  public unsubscribeToMeetup(idMeetup: number, idUser: number) {
    return this.http
      .delete<IMeetupData>(`${environment.apiUrl}${APIRoute.Meetup}`, { body: { idMeetup, idUser } })
      .subscribe(
        (patchedMeetupCard => {
          const previousValue = this.meetupsSubject.getValue();
          const index = previousValue.findIndex(item => item.id === idMeetup);

          this.meetupsSubject.next([
            ...previousValue.slice(0, index),
            patchedMeetupCard,
            ...previousValue.slice(index + 1),
          ])
        })
      )
  }
}
