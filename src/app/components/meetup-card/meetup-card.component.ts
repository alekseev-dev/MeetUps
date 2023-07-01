import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMeetupData } from 'src/app/interfaces/meetup-data';
import { IUser } from 'src/app/interfaces/user';
import { AppRoute, Role } from 'src/assets/const/common';

const openCloseCardAnimation = [
  trigger('openClose', [
    state('opened', style({ height: '50px', overflow: 'hidden' })),
    state('closed', style({ height: '*', overflow: 'hidden' })),
    transition('opened <=> closed', animate('300ms ease-in-out')),
  ]),
]

type TButtonStatusState = 'wontGo' | 'willGo' | 'edit';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: openCloseCardAnimation
})
export class MeetupCardComponent implements OnInit, OnChanges {
  public isCardOpened = false;
  public isOverdue = false;
  public buttonStatusState: TButtonStatusState = 'willGo'

  private _meetupData!: IMeetupData;
  private _subscribeToMeetup!: (idMeetup: number, idUser: number) => void;
  private _unsubscribeToMeetup!: (idMeetup: number, idUser: number) => void;
  private _user: IUser | null = null;

  constructor(
    private router: Router,
  ) { }

  @Input() set user(user: IUser | null) {
    this._user = user;
  }

  @Input() set meetupData(data: IMeetupData) {
    this._meetupData = data;
  }

  @Input() set subscribeToMeetup(method: (idMeetup: number, idUser: number) => void) {
    this._subscribeToMeetup = method;
  }

  @Input() set unsubscribeToMeetup(method: (idMeetup: number, idUser: number) => void) {
    this._unsubscribeToMeetup = method;
  }

  public handleSubscribeToMeetup() {
    const idMeetup = this._meetupData.id
    const idUser = this._user?.id
    if (typeof idUser === 'undefined') {
      return;
    }

    this._subscribeToMeetup(idMeetup, idUser)
  }

  public handleUnsubscribeToMeetup() {
    const idMeetup = this._meetupData.id
    const idUser = this._user?.id
    if (typeof idUser === 'undefined') {
      return;
    }

    this._unsubscribeToMeetup(idMeetup, idUser)
  }

  public editMeetup() {
    this.router?.navigate([AppRoute.CreateMeetup, this._meetupData])
  }

  ngOnChanges(): void {
    this.getStatusButtonState();
  }

  ngOnInit(): void {
    this.getOverdue();
  }

  public get meetupData() {
    return this._meetupData;
  }

  public toggleCard() {
    this.isCardOpened = !this.isCardOpened;
  }

  public getOverdue() {
    const currentTime = new Date()
    const diff = currentTime.getTime() - Date.parse(this._meetupData.time);

    if (diff > 0) {
      this.isOverdue = true;
    } else {
      this.isOverdue = false;
    }
  }

  public getStatusButtonState() {
    if (
      this._meetupData.owner.id === this._user?.id ||
      this._user?.roles.some(role => role.name === Role.Admin)
    ) {
      this.buttonStatusState = 'edit';

      return;
    }

    if (this._meetupData.users.some(user => user.id === this._user?.id)) {
      this.buttonStatusState = 'wontGo';
    } else {
      this.buttonStatusState = 'willGo';
    }
  }
}
