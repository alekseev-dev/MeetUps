import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.user) {
    return true;
  } else {
    return false;
  }
};
