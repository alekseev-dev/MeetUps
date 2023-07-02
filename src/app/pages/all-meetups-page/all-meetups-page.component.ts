import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISearchParams } from 'src/app/interfaces/filter-data';
import { AppRoute } from 'src/assets/const/common';

@Component({
  selector: 'app-all-meetups-page',
  templateUrl: './all-meetups-page.component.html',
  styleUrls: ['./all-meetups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMeetupsPageComponent {
  public searchParams: ISearchParams = {
    searchValue: '',
    searchType: '',
  };

  constructor(
    private router: Router,
  ) { }

  onSearchParams(value: ISearchParams) {
    this.searchParams = value;
  }

  createMeetup() {
    this.router.navigate([AppRoute.CreateMeetup])
  }
}
