import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type Size = 'small' | 'medium' | 'big';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  private _size!: Size;
  private _color: any;

  @Input() set color(color: any) {
    this._color = color;
  }

  get color() {
    return this._color;
  }

  @Input() set size(size: Size) {
    this._size = size;
  }

  get size() {
    return this._size;
  }
}
