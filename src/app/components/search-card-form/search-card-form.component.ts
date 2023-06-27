import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-card-form',
  templateUrl: './search-card-form.component.html',
  styleUrls: ['./search-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCardFormComponent implements OnInit {
  public formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });
  }

  @Output() searchValue = new EventEmitter<string>();

  onFormChange(): void {
    this.searchValue.emit(this.formGroup.value.search);
  }
}
