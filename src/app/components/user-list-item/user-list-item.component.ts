import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  deleteUser() {

  }

  editUser() {
    this.isEditing = !this.isEditing;
    console.log(this.isEditing);
  }
}
