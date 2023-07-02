import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-card-form',
  templateUrl: './search-card-form.component.html',
  styleUrls: ['./search-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCardFormComponent implements OnInit {
  public formGroup!: FormGroup;
  private searchValueSubject = new Subject<string>();

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });

    this.searchValueSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((searchValue => {
        this.searchValue.emit(searchValue)
      }))
  }

  @Output() searchValue = new EventEmitter<string>();

  onFormChange(): void {
    this.searchValueSubject.next(this.formGroup.value.search);
  }
}
