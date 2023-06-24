import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMeetupData } from 'src/app/interfaces/meetup-data';


@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupCardComponent implements OnInit {
  public isCardOpened = false;
  public isUserGoing = false;
  public isOverdue!: boolean;

  private _meetupData!: IMeetupData;

  @Input() set meetupData(data: IMeetupData) {
    this._meetupData = data;
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

  getOverdue() {
    const currentTime = new Date()
    const diff = currentTime.getTime() - Date.parse(this._meetupData.time);

    if (diff > 0) {
      this.isOverdue = true;
    } else {
      this.isOverdue = false;
    }
  }
}
