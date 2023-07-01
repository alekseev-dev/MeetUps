import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoute } from 'src/assets/const/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public hide = true;
  public AppRoute = AppRoute;

  public formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.userValue) {
      this.router.navigate([AppRoute.Root]);
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
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
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

      return;
    }
    const { email, password } = this.formGroup.value;

    this.authService.login(email, password)
      .pipe(take(1))
      .subscribe();
  }
}
