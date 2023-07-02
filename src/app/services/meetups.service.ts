import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { APIRoute, AppRoute } from 'src/assets/const/common';
import { adaptToClient, adaptToServer } from 'src/assets/utils/utils';
import { environment } from 'src/environments/environment';
import { IMeetupData, TCreateMeetup } from '../interfaces/meetup-data';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})

export class MeetupsService implements OnDestroy {
  private meetupsSubject = new BehaviorSubject<IMeetupData[]>([]);
  public meetups$ = this.meetupsSubject.asObservable();
  private intervalSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.getMeetups();
  }

  public getMeetups() {
    this.fetchMeetups();

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(10000)
      .subscribe(() => this.fetchMeetups());
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  private fetchMeetups() {
    this.loadingService.showGlobal();
    this.http.get<IMeetupData[]>(`${environment.apiUrl}${APIRoute.Meetup}`)
      .subscribe(meetups => {
        this.meetupsSubject.next(adaptToClient(meetups));
        this.loadingService.hideGlobal();
      });
  }

  public createMeetup(meetup: TCreateMeetup) {
    this.loadingService.showGlobal();
    const adaptedData = adaptToServer(meetup);

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
          this.loadingService.hideGlobal();
        })
      )
  };

  public saveMeetup(id: number, meetup: TCreateMeetup) {
    this.loadingService.showGlobal();
    const adaptedData = adaptToServer(meetup);

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
          this.loadingService.hideGlobal();
        })
      )
  };

  public deleteMeetup(id: number) {
    this.loadingService.showGlobal();

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
          this.loadingService.hideGlobal();
        })
      )
  };

  public subscribeToMeetup(idMeetup: number, idUser: number) {
    this.loadingService.showGlobal();

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

          this.loadingService.hideGlobal();
        })
      )
  }

  public unsubscribeToMeetup(idMeetup: number, idUser: number) {
    this.loadingService.showGlobal();

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

          this.loadingService.hideGlobal();
        })
      )
  }
}
