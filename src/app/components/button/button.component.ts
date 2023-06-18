import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// export interface ISize {
//   small: 'small';
//   medium: 'medium';
//   big: 'big';
// };

export type ISize = 'small' | 'medium' | 'big';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  // private _iconUrl: string = '';
  private _size!: ISize;
  private _color: any;

  // @Input() set icon(icon: string) {
  //   this._iconUrl = icon
  // }
  // @Input() set text(text: string) {
  //   this._text = text;
  // }
  @Input() set color(color: any) {
    this._color = color;
  }

  get color() {
    return this._color;
  }

  @Input() set size(size: ISize) {
    this._size = size;
  }

  get size() {
    return this._size;
  }
}
