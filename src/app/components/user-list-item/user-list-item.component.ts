import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
export class UserListItemComponent {
  public userRole: Role[] = Object.values(Role);
  public isEditing = false;
  public hasRoles: boolean[] = [];
  private _user!: IUserlistItem;
  public formGroup!: FormGroup;

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getUserRoles()

    this.formGroup = new FormGroup<IUserItemForm>({
      email: new FormControl(this._user.email || '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
        ]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      role: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
    })
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get role() {
    return this.formGroup.get('role');
  }


  @Input() set user(data: IUserlistItem) {
    this._user = data;
  }

  public get user() {
    return this._user;
  }

  compareRoles(role1: any, role2: any): boolean {
    return role1 && role2 ? role1.name === role2.name : role1 === role2;
  }

  getUserRoles() {
    this.userRole.forEach(userRole => {
      this._user.roles.forEach(role => {
        if (role.name === userRole) {
          this.hasRoles.push(true);
        } else {
          this.hasRoles.push(false);
        }
      })
    });
  }

  public deleteUser() {
    const id = this._user.id;
    this.userService.deleteUser(id)
  }

  public updateUserInfo() {
    // if (this.formGroup.invalid) {
    //   Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

    //   return;
    // }

    // const { email, password, fio } = this.formGroup.getRawValue();
    // this.editUser();
    // console.log(this.isEditing);

    // if (!this.isEditing) {
    //   const { id, email, password, fio } = this._user;
    //   this.userService.updateUserInfo(id, email, password, fio)
    // }
  }

  public editUser() {
    this.isEditing = !this.isEditing;
  }
}
