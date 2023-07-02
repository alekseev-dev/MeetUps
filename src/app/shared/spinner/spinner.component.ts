import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  private _diameter = 100;

  @Input() set diameter(value: number) {
    this._diameter = value;
  }

  get diameter(): number {
    return this._diameter
  }
}
