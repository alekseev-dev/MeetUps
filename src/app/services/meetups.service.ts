import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, catchError, interval, throwError } from 'rxjs';
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
  }

  public getMeetups() {
    this.fetchMeetups();

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(100000)
      .subscribe(() => this.fetchMeetups());
  }

  private fetchMeetups() {
    this.loadingService.showGlobal();

    this.http.get<IMeetupData[]>(`${environment.apiUrl}${APIRoute.Meetup}`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred while fetch the meetups:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
      .subscribe(meetups => {
        this.meetupsSubject.next(adaptToClient(meetups));
        this.loadingService.hideGlobal();
      });
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  public createMeetup(meetup: TCreateMeetup) {
    this.loadingService.showGlobal();
    const adaptedData = adaptToServer(meetup);

    return this.http
      .post<IMeetupData>(`${environment.apiUrl}${APIRoute.Meetup}`, adaptedData)
      .pipe(
        catchError((error) => {
          console.error('An error occurred while creating the meetup:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
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
      .pipe(
        catchError((error) => {
          console.error('An error occurred while saving the meetup:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
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
      .pipe(
        catchError((error) => {
          console.error('An error occurred while deleting the meetup:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
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
      .pipe(
        catchError((error) => {
          console.error('An error occurred while subscribe to the meetup:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
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
      .pipe(
        catchError((error) => {
          console.error('An error occurred while unsubscribe to the meetup:', error.message);
          this.loadingService.hideGlobal();
          return throwError(() => error);
        })
      )
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
