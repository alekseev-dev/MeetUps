import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-input',
  templateUrl: './admin-input.component.html',
  styleUrls: ['./admin-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminInputComponent {
  text = "outsidious@yandex.ru";
  isEditable = true;
  private _type!: string;

  changeState() {
    this.isEditable = !this.isEditable;
  }

  @Input() set type(value: string) {
    this._type = value;
  }

  public get type() {
    return this._type;
  }
}
