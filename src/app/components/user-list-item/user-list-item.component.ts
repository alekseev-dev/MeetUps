import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
export class UserListItemComponent implements OnInit, DoCheck {
  public userRole: Role[] = Object.values(Role);
  public isEditing = false;
  public hasRoles: Role[] = [];
  private _user!: IUserlistItem;
  public formGroup!: FormGroup;
  public plugPassword = 'randompassword';

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
      password: new FormControl(this.plugPassword, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      role: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          this.atLeastOneRoleSelectedValidator,
        ]
      }),
    })
  }

  ngDoCheck(): void {
    this.changeFormStatus()
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

  compareRoles(role1: Role, role2: Role): boolean {
    return role1 && role2 ? role1 === role2 : role1 === role2;
  }

  changeFormStatus() {
    if (!this.isEditing) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  atLeastOneRoleSelectedValidator = (control: AbstractControl): ValidationErrors | null => {
    const roles = control.value;

    if (Array.isArray(roles) && roles.length === 0) {
      return { noRoleSelected: true };
    }

    return null;
  };

  getUserRoles() {
    this.userRole.forEach(userRole => {
      const roleExists = this._user.roles.some(role => role.name === userRole);
      if (roleExists) {
        this.hasRoles.push(userRole);
      }
    });
  }

  public deleteUser() {
    const id = this._user.id;
    this.userService.deleteUser(id)
  }

  public updateUserRole() {
    // if (this.formGroup.invalid) {
    //   Object.keys(this.formGroup.controls).forEach(control => this.formGroup.controls[control].markAsTouched());

    //   return;
    // }

    const id = this._user.id
    const { role: name } = this.formGroup.getRawValue();

    // this.userService.updateUserRole(id, name.at(1))
  }

  public updateUserInfo() {
    // if (this.formGroup.invalid) {
    //   // Object.keys(this.formGroup.controls).forEach(control =>
    //   //   this.formGroup.controls[control].markAsTouched()
    //   // );
    //   return;
    // }

    this.isEditingToggle();

    const { email, password } = this.formGroup.getRawValue();
    console.log('email', email == this._user.email);
    console.log('pass', password === this.plugPassword);
    console.log(this.isEditing);

    if (
      email === this._user.email &&
      password === this.plugPassword || password === '' &&
      this.isEditing === false
    ) {
      return;
    }
    this.isEditingToggle();

    if (this.isEditing) {
      const id = this._user.id;
      this.userService.updateUserInfo(id, email, password);
    }
  }

  public isEditingToggle() {
    this.isEditing = !this.isEditing;
  }
}
