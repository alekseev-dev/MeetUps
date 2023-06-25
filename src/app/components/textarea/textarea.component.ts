import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
  private _placeholder!: string;

  @Input() set placeholder(value: string) {
    this._placeholder = value;
  }

  public get placeholder() {
    return this._placeholder;
  }
}
