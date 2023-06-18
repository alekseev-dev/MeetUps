import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMeetupData } from 'src/app/interfaces/meetup-data';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupCardComponent {
  public panelOpenState = false;

  private _meetupData!: IMeetupData;

  @Input() set meetupData(data: IMeetupData) {
    this._meetupData = data;
  }

  public get meetupData() {
    return this._meetupData;
  }

  public toggleCard() {
    this.panelOpenState = !this.panelOpenState;
  }
}
