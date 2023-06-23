import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoute, Role } from 'src/assets/const/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public AppRoute: typeof AppRoute = AppRoute;
  public user$!: Observable<IUser | null>;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.userData
  }

  public get isAdmin() {
    return this.authService.userValue?.roles.at(0)?.name === Role.Admin
  }

  public logout() {
    this.authService.logout();
  }
}
