import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { APIRoute, AppRoute } from 'src/assets/const/common';
import { adaptToClient, adaptToServer } from 'src/assets/utils/utils';
import { environment } from 'src/environments/environment';
import { IMeetupData, TCreateMeetup } from '../interfaces/meetup-data';

@Injectable({
  providedIn: 'root'
})

export class MeetupsService {
  private meetupsSubject = new BehaviorSubject<IMeetupData[]>([]);
  public meetups$ = this.meetupsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
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

  public createMeetup(meetup: TCreateMeetup) {
    const adaptedData = adaptToServer(meetup);
    console.log(adaptedData);

    return this.http
      .post<IMeetupData>(`${environment.apiUrl}${APIRoute.Meetup}`, adaptedData)
      .subscribe(
        (meetups => {
          const previousValue = this.meetupsSubject.getValue();
          this.meetupsSubject.next([
            ...previousValue,
            adaptToClient(meetups),
          ]);
          this.router.navigate([AppRoute.AllMeetups]);
        })
      )
  };

  public saveMeetup(id: number, meetup: TCreateMeetup) {
    const adaptedData = adaptToServer(meetup);
    console.log(adaptedData);

    return this.http
      .put<IMeetupData>(`${environment.apiUrl}${APIRoute.Meetup}/${id}`, adaptedData)
      .subscribe(
        (patchedMeetupCard => {
          const previousValue = this.meetupsSubject.getValue();
          const index = previousValue.findIndex(item => item.id === id);

          this.meetupsSubject.next([
            ...previousValue.slice(0, index),
            adaptToClient(patchedMeetupCard),
            ...previousValue.slice(index + 1),
          ])
          this.router.navigate([AppRoute.AllMeetups]);
        })
      )
  };

  public deleteMeetup(id: number) {
    return this.http
      .delete<IMeetupData>(`${environment.apiUrl}${APIRoute.Meetup}/${id}`, { body: { id } })
      .subscribe(
        (patchedMeetupCard => {
          const previousValue = this.meetupsSubject.getValue();
          const index = previousValue.findIndex(item => item.id === id);

          this.meetupsSubject.next([
            ...previousValue.slice(0, index),
            adaptToClient(patchedMeetupCard),
            ...previousValue.slice(index + 1),
          ])
          this.router.navigate([AppRoute.AllMeetups]);
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
            adaptToClient(patchedMeetupCard),
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
            adaptToClient(patchedMeetupCard),
            ...previousValue.slice(index + 1),
          ])
        })
      )
  }
}
