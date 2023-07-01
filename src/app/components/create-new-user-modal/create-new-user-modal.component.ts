import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

interface ICreateUserForm {
  [key: string]: FormControl<string> | FormControl<Date>;
  "email": FormControl<string>,
  "password": FormControl<string>,
  "fio": FormControl<string>,
}

@Component({
  selector: 'app-create-new-user-modal',
  templateUrl: './create-new-user-modal.component.html',
  styleUrls: ['./create-new-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNewUserModalComponent {
  public formGroup!: FormGroup<ICreateUserForm>;

  constructor(
    public dialogRef: MatDialogRef<CreateNewUserModalComponent>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup<ICreateUserForm>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
        ]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      fio: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
    })
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get fio() {
    return this.formGroup.get('fio');
  }

  createNewUser() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

      return;
    }

    const { email, password, fio } = this.formGroup.getRawValue();

    this.authService.registration(email, password, fio)
      .pipe(
        take(1),
        tap(_ => this.dialogRef.close()))
      .subscribe();
  }
}
