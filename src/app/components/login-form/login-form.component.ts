import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  public hide = true;
  public formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    console.log(' this.authService.user:', this.authService.user)
  }

  login() {
    const { email, password } = this.formGroup.value
    this.authService.login(email, password)
      .pipe(take(1))
      .subscribe();
  }
}
