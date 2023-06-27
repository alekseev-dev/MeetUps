import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IMeetupData } from 'src/app/interfaces/meetup-data';

const openCloseCardAnimation = [
  trigger('openClose', [
    state('opened', style({ height: '50px', overflow: 'hidden' })),
    state('closed', style({ height: '*', overflow: 'hidden' })),
    transition('opened <=> closed', animate('300ms ease-in-out')),
  ]),
]

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: openCloseCardAnimation
})
export class MeetupCardComponent implements OnInit, OnChanges {
  public isCardOpened = false;
  public isUserGoing = false;
  public isOverdue!: boolean;

  private _meetupData!: IMeetupData;
  private _subscribeToMeetup!: (idMeetup: number, idUser: number) => void;
  private _unsubscribeToMeetup!: (idMeetup: number, idUser: number) => void;
  private _userId!: number;

  @Input() set userId(id: number) {
    this._userId = id;
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
    const idUser = this._userId
    this._subscribeToMeetup(idMeetup, idUser)
  }

  public handleUnsubscribeToMeetup() {
    const idMeetup = this._meetupData.id
    const idUser = this._userId
    this._unsubscribeToMeetup(idMeetup, idUser)
  }

  ngOnChanges(): void {
    this.isSubscribed();
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

  public toggleStatus() {
    this.isUserGoing = !this.isUserGoing;
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

  public isSubscribed() {
    this.isUserGoing = this._meetupData.users.some(user => user.id === this._userId)
  }
}
