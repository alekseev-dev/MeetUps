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

  writeValue(value: any): void {
    // Set the value of the textarea from the external form control
    // For example, if you want to update the textarea value programmatically
    // you need to call this method
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this method if you want to disable the textarea programmatically
  }

  // Add event handlers for input and blur events to capture changes in the textarea value
  onInput(event: any) {
    this.onChange(event.target.value);
  }

  onBlur(event: any) {
    this.onTouch();
  }
}
