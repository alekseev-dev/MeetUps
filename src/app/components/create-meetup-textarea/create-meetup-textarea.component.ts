import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-create-meetup-textarea',
  templateUrl: './create-meetup-textarea.component.html',
  styleUrls: ['./create-meetup-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateMeetupTextareaComponent),
      multi: true,
    },
  ],
})
export class CreateMeetupTextareaComponent {
  private _placeholder = '';
  private _id = '';
  private onChange: any = () => { };
  private onTouch: any = () => { };


  @Input() set placeholder(value: string) {
    this._placeholder = value;
  }

  public get placeholder() {
    return this._placeholder;
  }

  @Input() set id(value: string) {
    this._id = value;
  }

  public get id() {
    return this._id;
  }

  onInput(event: any) {
    this.onChange(event.target.value);
  }

  onBlur(event: any) {
    this.onTouch();
  }
}
