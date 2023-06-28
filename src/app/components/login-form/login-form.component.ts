import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { EmailValidator } from 'src/app/email.validator';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoute } from 'src/assets/const/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EmailValidator]
})
export class LoginFormComponent implements OnInit {
  public hide = true;
  public AppRoute = AppRoute;

  public formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private emailValidator: EmailValidator,
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ],
      }),
    });
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  login() {
    const { email, password } = this.formGroup.value;

    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

      return;
    }

    this.authService.login(email, password)
      .pipe(take(1))
      .subscribe();
  }
}
