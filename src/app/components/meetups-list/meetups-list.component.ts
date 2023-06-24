import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMeetupData } from 'src/app/interfaces/meetup-data';
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
  private _meetups$!: any;

  constructor(
    private meetupsService: MeetupsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.meetupsService.getMeetups();
    this._meetups$ = this.meetupsService.meetups$;
    console.log(this._meetups$);
  }

  public get meetups$() {
    return this._meetups$;
  }

  identify(index: number, item: IMeetupData) {
    return item.id;
  }

  createMeetup() {
    this.router.navigate([AppRoute.UserCreateMeetup])
  }
}
