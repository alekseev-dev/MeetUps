import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMeetupData } from 'src/app/interfaces/meetup-data';
import { MeetupsService } from 'src/app/services/meetups.service';

interface ICreateMeetupForm {
  [key: string]: FormControl<string> | FormControl<Date>;
  "name": FormControl<string>,
  "date": FormControl<string>,
  "time": FormControl<string>,
  "place": FormControl<string>,
  "description": FormControl<string>,
  'target-audience': FormControl<string>,
  'what-to-know': FormControl<string>,
  'what-will': FormControl<string>,
  'why-come': FormControl<string>,
}

@Component({
  selector: 'app-create-meetup',
  templateUrl: './create-meetup.component.html',
  styleUrls: ['./create-meetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMeetupComponent {
  public formGroup!: FormGroup<ICreateMeetupForm>;
  private _meetupData: IMeetupData | null = null;
  private _isEditing = false;
  public defaultTime = '';
  public defaultDate = '';

  constructor(
    private meetupsService: MeetupsService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getCurrentTime();
    this.getCurrentDate();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.formGroup = new FormGroup<ICreateMeetupForm>({
      name: new FormControl(this._meetupData?.name || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      date: new FormControl(this.defaultDate, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      time: new FormControl(this.defaultTime, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      place: new FormControl(this._meetupData?.location || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      description: new FormControl(this._meetupData?.description || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      'target-audience': new FormControl(this._meetupData?.targetAudience || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      'what-to-know': new FormControl(this._meetupData?.needToKnow || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      'what-will': new FormControl(this._meetupData?.willHappen || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      'why-come': new FormControl(this._meetupData?.reasonToCome || '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
    });
  }

  @Input() set meetupData(data: IMeetupData | null) {
    this._meetupData = data;
  }

  @Input() set isEditing(flag: boolean) {
    this._isEditing = flag;
  }

  get name() {
    return this.formGroup.get('name');
  }

  get date() {
    return this.formGroup.get('date');
  }

  get time() {
    return this.formGroup.get('time');
  }

  get place() {
    return this.formGroup.get('place');
  }

  get description() {
    return this.formGroup.get('description');
  }

  get targetAudience() {
    return this.formGroup.get('target-audience');
  }

  get whatToKnow() {
    return this.formGroup.get('what-to-know');
  }

  get whatWill() {
    return this.formGroup.get('what-will');
  }

  get whyCome() {
    return this.formGroup.get('why-come');
  }

  get isEditing(): boolean {
    return this._isEditing;
  }

  getCurrentTime() {
    const dateString = this._meetupData?.time || new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' });

    if (typeof dateString === 'undefined') {
      return;
    }

    const dateObj = new Date(dateString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    this.defaultTime = hours + ':' + minutes;
  }

  getCurrentDate() {
    const dateString = this._meetupData?.time || new Date().toISOString();

    if (typeof dateString === 'undefined') {
      return;
    }

    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    this.defaultDate = `${year}-${month}-${day}`;
  }

  createMeetup() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());
      this.cdr.detectChanges();

      return;
    }

    const formValue = this.formGroup.getRawValue();

    const formData = {
      "name": formValue.name,
      "description": formValue.description,
      "time": new Date(`${formValue.date}T${formValue.time}:00.000Z`).toISOString(),
      "duration": 60,
      "location": formValue.place,
      "targetAudience": formValue['target-audience'],
      "needToKnow": formValue['what-to-know'],
      "willHappen": formValue['what-will'],
      "reasonToCome": formValue['why-come'],
    }

    this.meetupsService.createMeetup(formData)
  }

  saveMeetup() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());
      this.cdr.detectChanges();

      return;
    }

    const formValue = this.formGroup.getRawValue();
    const meetUpId = this._meetupData?.id

    if (typeof meetUpId === 'undefined') {
      return;
    }

    const formData = {
      "name": formValue.name,
      "description": formValue.description,
      "time": new Date(`${formValue.date}T${formValue.time}:00.000Z`).toISOString(),
      "duration": 60,
      "location": formValue.place,
      "targetAudience": formValue['target-audience'],
      "needToKnow": formValue['what-to-know'],
      "willHappen": formValue['what-will'],
      "reasonToCome": formValue['why-come'],
    }
    this.meetupsService.saveMeetup(meetUpId, formData)
  }

  deleteMeetup() {
    const id = this._meetupData?.id
    if (typeof id === 'undefined') {
      return;
    }

    this.meetupsService.deleteMeetup(id)
  }
}
