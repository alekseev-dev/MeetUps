import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user

  if (user) {
    const { roles } = route.data;

    if (roles && !roles.includes(user.roles.at(0)?.name)) {
      router.navigate(['**']);
      return false;
    }

    return true;
  } else {
    return false;
  }
};
