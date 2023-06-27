import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from 'src/assets/const/common';

@Component({
  selector: 'app-all-meetups-page',
  templateUrl: './all-meetups-page.component.html',
  styleUrls: ['./all-meetups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMeetupsPageComponent {
  public searchValue = '';

  constructor(
    private router: Router,
  ) { }

  onSearchValue(value: string) {
    this.searchValue = value;
  }

  createMeetup() {
    this.router.navigate([AppRoute.UserCreateMeetup])
  }
}
