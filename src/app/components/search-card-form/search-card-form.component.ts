import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { ISearchParams } from 'src/app/interfaces/filter-data';
import { LoadingService } from 'src/app/services/loading.service';
import { FilterType } from 'src/assets/const/common';

interface ISearchCardForm {
  [key: string]: FormControl<string>;
  "search-value": FormControl<string>,
  "search-type": FormControl<string>,
}

@Component({
  selector: 'app-search-card-form',
  templateUrl: './search-card-form.component.html',
  styleUrls: ['./search-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCardFormComponent implements OnInit {
  public formGroup: FormGroup<ISearchCardForm>;
  private searchParamsSubject = new Subject<ISearchParams>();
  public selectedValue: FilterType[] = Object.values(FilterType);
  public loading$ = this.loadingService.loadingLocal$;

  constructor(
    private loadingService: LoadingService
  ) {
    this.formGroup = new FormGroup<ISearchCardForm>({
      'search-value': new FormControl('', {
        nonNullable: true
      }),
      'search-type': new FormControl(FilterType.Name, {
        nonNullable: true
      })
    });
  }

  ngOnInit(): void {
    this.searchParamsSubject
      .pipe(
        tap(_ => {
          this.loadingService.showLocal();
        }),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((searchValue) => {
        this.loadingService.hideLocal();
        this.searchParams.emit(searchValue)
      });
  }

  @Output() searchParams = new EventEmitter<ISearchParams>();

  onFormChange(): void {
    const { 'search-value': searchValue, 'search-type': searchType } =
      this.formGroup.getRawValue();

    const searchParams: ISearchParams = {
      searchValue,
      searchType
    };

    this.searchParamsSubject.next(searchParams);
  }
}
