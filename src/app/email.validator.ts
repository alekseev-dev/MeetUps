import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) { }

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.authService.isEmailExist(control.value).pipe(
      map(isExist => (isExist ? { emailIsInvalid: true } : null)),
      catchError(() => of(null))
    );
  }
}
