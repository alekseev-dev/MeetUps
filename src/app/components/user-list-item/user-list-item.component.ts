import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserlistItem } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { Role } from 'src/assets/const/common';

interface IUserItemForm {
  [key: string]: FormControl<string> | FormControl<Date>;
  "email": FormControl<string>,
  "password": FormControl<string>,
  "role": FormControl<string>,
}

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent implements OnInit {
  public userRole: Role[] = Object.values(Role);
  public isEditing = false;
  private _user!: IUserlistItem;
  public formGroup!: FormGroup;
  public plugPassword = 'randompassword';

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup<IUserItemForm>({
      email: new FormControl(this._user.email || '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
        ]
      }),
      password: new FormControl(this.plugPassword, {
        nonNullable: true,
        validators: []
      }),
      role: new FormControl(this.getRole(), {
        nonNullable: true,
        validators: []
      }),
    })

    this.formGroup.disable();
  }

  @Input() set user(data: IUserlistItem) {
    this._user = data;
  }

  public get user() {
    return this._user;
  }

  getRole(): Role {
    if (this._user.roles.some(role => role.name === Role.Admin)) {
      return Role.Admin;
    }

    return Role.User
  }

  public deleteUser() {
    const id = this._user.id;
    this.userService.deleteUser(id)
  }

  public updateUserRole() {
    const id = this._user.id
    const { role } = this.formGroup.getRawValue();
    let names = [];

    if (role === Role.Admin) {
      names = [
        "ADMIN",
        "USER"
      ]
    } else {
      names = [
        "USER"
      ]
    }

    this.userService.updateUserRole(id, names)
  }

  public updateUserInfo() {
    if (this.formGroup.invalid) {
      console.log(this.formGroup.invalid);

      return;
    }

    this.isEditingToggle()

    if (this.isEditing === true) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }

    const { email, password } = this.formGroup.getRawValue();

    if (this.isEmailChanged(email) || this.isPasswordChanged(password)) {
      this.plugPassword = password;
      const id = this._user.id;

      this.userService.updateUserInfo(id, email, password);

      this.isEditing = false;
      this.formGroup.disable();
    }
  }

  private isPasswordChanged(pw: string) {
    return pw !== this.plugPassword;
  }

  private isEmailChanged(email: string) {
    return email !== this._user.email;
  }

  public isEditingToggle() {
    this.isEditing = !this.isEditing;
  }
}
