import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { IMeetupData } from 'src/app/interfaces/meetup-data';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';
import { AppRoute } from 'src/assets/const/common';

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss'],
  providers: [MeetupsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsListComponent implements OnInit, OnChanges {
  private _meetups$!: Observable<IMeetupData[]>;
  private _userId!: number;
  private _searchValue = '';

  constructor(
    private meetupsService: MeetupsService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnChanges() {
    this.filterData();
  }

  ngOnInit(): void {
    this.meetupsService.getMeetups();
    this._userId = this.authService.userValue!.id;
  }

  @Input() set searchValue(value: string) {
    this._searchValue = value;
  }

  filterData(): void {
    if (this.router.url === `/${AppRoute.MyMeetups}`) {
      const myMeetups$ = this.meetupsService.meetups$.pipe(
        map(
          meetups => meetups.filter(
            meetup => meetup.users.some(
              user => user.id === this._userId
            )
          )
        )
      );

      this._meetups$ = this.filterDataBySearch(myMeetups$);
    } else {
      this._meetups$ = this.filterDataBySearch(this.meetupsService.meetups$);
    }
  }

  filterDataBySearch(meetups$: Observable<IMeetupData[]>): Observable<IMeetupData[]> {
    return meetups$.pipe(
      map(
        meetups => meetups.filter(
          meetup => meetup.name.toLowerCase().includes(this._searchValue)
        )
      ),
      debounceTime(500),
    );
  }

  public get userId() {
    return this._userId;
  }

  public get meetups$() {
    return this._meetups$;
  }

  identify(index: number, item: IMeetupData): number {
    return item.id;
  }

  public subscribeToMeetup(idMeetup: number, idUser: number) {
    this.meetupsService.subscribeToMeetup(idMeetup, idUser)
  }

  public unsubscribeToMeetup(idMeetup: number, idUser: number) {
    this.meetupsService.unsubscribeToMeetup(idMeetup, idUser)
  }
}
