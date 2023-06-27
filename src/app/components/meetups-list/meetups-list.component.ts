import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
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
export class MeetupsListComponent implements OnInit {
  private _meetups$!: Observable<IMeetupData[]>;
  private _userId!: number;

  constructor(
    private meetupsService: MeetupsService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.meetupsService.getMeetups();

    if (this.router.url === `/${AppRoute.MyMeetups}`) {
      this._meetups$ = this.meetupsService.meetups$.pipe(
        map(
          meetups => meetups.filter(
            meetup => meetup.users.some(
              user => user.id === this._userId)))
      );
    } else {
      this._meetups$ = this.meetupsService.meetups$;
    }

    this._userId = this.authService.userValue!.id
  }

  public get userId() {
    return this._userId;
  }

  public get meetups$() {
    return this._meetups$;
  }

  identify(index: number, item: IMeetupData) {
    return item.id;
  }

  public subscribeToMeetup(idMeetup: number, idUser: number) {
    this.meetupsService.subscribeToMeetup(idMeetup, idUser)
  }

  public unsubscribeToMeetup(idMeetup: number, idUser: number) {
    this.meetupsService.unsubscribeToMeetup(idMeetup, idUser)
  }
}
