import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IMeetupData } from 'src/app/interfaces/meetup-data';
import { IUser } from 'src/app/interfaces/user';
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
  private _meetups$?: Observable<IMeetupData[]>;
  private _user: IUser | null = null;
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
    this._user = this.authService.userValue;
  }

  @Input() set searchValue(value: string) {
    this._searchValue = value;
  }

  get searchValue() {
    return this._searchValue
  }

  filterData(): void {
    if (this.router.url === `/${AppRoute.MyMeetups}`) {
      const myMeetups$ = this.meetupsService.meetups$.pipe(
        map(
          meetups => meetups.filter(
            meetup => meetup.users.some(
              user => user.id === this._user?.id
            )
          )
        )
      );

      this._meetups$ = myMeetups$;
    } else {
      this._meetups$ = this.meetupsService.meetups$;
    }
  }

  public get user() {
    return this._user;
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
