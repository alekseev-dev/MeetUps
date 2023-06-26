import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUserlistItem } from 'src/app/interfaces/user';
import { Role } from 'src/assets/const/common';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent {
  public userRole: Role[] = Object.values(Role)
  public isEditing = false;
  private _user!: IUserlistItem;

  @Input() set user(data: IUserlistItem) {
    this._user = data;
  }

  public get user() {
    return this._user;
  }

  public deleteUser() {

  }

  public editUser() {
    this.isEditing = !this.isEditing;
    console.log(this.isEditing);
  }
}
