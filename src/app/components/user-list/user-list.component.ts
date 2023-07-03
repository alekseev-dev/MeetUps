import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserlistItem } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  private _users$!: Observable<IUserlistItem[]>;

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers();
    this._users$ = this.userService.users$;
  }

  public get users$() {
    return this._users$;
  }

  public identify(index: number, item: IUserlistItem) {
    return item.id;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
  }

  updateUserRole(id: number, names: string[]) {
    this.userService.updateUserRole(id, names)
  }

  updateUserInfo(id: number, email: string, password: string) {
    this.userService.updateUserInfo(id, email, password)
  }
}
