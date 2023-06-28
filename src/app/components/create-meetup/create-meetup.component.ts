import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './create-meetup.component.html',
  styleUrls: ['./create-meetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMeetupComponent {
  public formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl('', [
        Validators.required,
      ]),
      time: new FormControl('', [
        Validators.required,
      ]),
      place: new FormControl('', [
        Validators.required,
      ]),
      summary: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      'target-audience': new FormControl('', [
        Validators.required,
      ]),
      'what-to-know': new FormControl('', [
        Validators.required,
      ]),
      'what-will': new FormControl('', [
        Validators.required,
      ]),
      'why-come': new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  test() {
    console.log(this.formGroup.value);

  }

  get password() {
    return this.formGroup.get('password');
  }
}
