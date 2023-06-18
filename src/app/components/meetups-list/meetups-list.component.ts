import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IMeetupData } from 'src/app/interfaces/meetup-data';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss'],
  providers: [MeetupsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsListComponent implements OnInit {
  private _meetupsData: IMeetupData[] = [];

  constructor(
    private meetupsDataService: MeetupsService,
  ) { }

  ngOnInit(): void {
    this._meetupsData = this.meetupsDataService.meetupsData;
  }

  get meetupsData() {
    return this._meetupsData;
  }

  identify(index: number, item: IMeetupData) {
    return item.author;
  }
}
